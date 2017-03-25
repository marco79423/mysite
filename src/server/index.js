import express from 'express'
import compression from 'compression'
import path from 'path'
import { argv } from 'yargs'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import 'isomorphic-fetch';
import React from 'react'
import {RouterContext, match} from 'react-router'
import createMemoryHistory from 'history/createMemoryHistory'
import {Provider} from 'react-redux'
import ReactDOMServer from 'react-dom/server';
import webpackConfig from '../../webpack.config.client'
import Helmet from 'react-helmet'

import {createRoutes} from '../common/routes'
import {configureStore} from '../common/store'
import * as articleActions from '../common/ducks/article/actions'
import * as pageActions from '../common/ducks/page/actions'

import {renderHtmlPage} from './htmlRender'


const app = express()
const port = +argv.port || 3000

if (process.env.DEBUG) {
  const compiler = webpack(webpackConfig)
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use(compression())
}

app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')))
app.get('*', (req, res) => {
  const history = createMemoryHistory(req.path)
  let store = configureStore(history)
  match({routes: createRoutes(history), location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      Promise.all([
        store.dispatch(articleActions.fetchArticles()),
        store.dispatch(pageActions.fetchPages())
      ])
        .then(() => {
          const html = ReactDOMServer.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )
          const head = Helmet.rewind()
          res.status(200).send(renderHtmlPage(html, head, store.getState()))
        })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`)
})
