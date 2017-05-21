import express from 'express'
import apicache from 'apicache'
import compression from 'compression'
import path from 'path'
import { argv } from 'yargs'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import 'isomorphic-fetch'
import React from 'react'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import webpackConfig from '../../webpack.config.client'
import Helmet from 'react-helmet'

import promiseReject from '../lib/promiseReject'
import * as config from '../config/server'
import { createRoutes } from '../common/routes'
import { configureStore } from '../common/store'
import * as articleActions from '../common/ducks/article/actions'
import * as pageActions from '../common/ducks/page/actions'

import { renderHtmlPage, renderHtmlPageByServerRendering } from './htmlRender'

function prepareFetchingPromise (store, url) {
  const promises = [
    store.dispatch(articleActions.fetchArticles())
  ]
  if (/\/me\//.test(url)) {
    promises.push(store.dispatch(pageActions.fetchPages()))
  }
  return Promise.all(promises)
}

function run () {
  const app = express()
  const port = +argv.port || config.DEFAULT_PORT

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
    app.use(apicache.middleware(config.CACHE_TIMEOUT))
    app.use(compression())
  }

  app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')))
  app.use((req, res) => {
    const history = createMemoryHistory(req.path)
    let store = configureStore(history)
    match({routes: createRoutes(history), location: req.url}, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        if (config.SERVER_RENDERING) {
          Promise.race([
            prepareFetchingPromise(store, req.url),
            promiseReject(config.QUERY_TIMEOUT, 'Time out')
          ])
            .then(() => {
              const html = ReactDOMServer.renderToString(
                <Provider store={store}>
                  <RouterContext {...renderProps} />
                </Provider>
              )
              const head = Helmet.renderStatic()
              res.status(200).send(renderHtmlPageByServerRendering(head, store.getState(), html))
            })
            .catch(() => {
              res.status(500).send('網站出事惹！！！')
            })
        } else {
          res.status(200).send(renderHtmlPage())
        }
      } else {
        res.status(404).send('Not found')
      }
    })
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`)
  })
}

run()
