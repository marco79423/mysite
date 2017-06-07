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
import { createMemoryHistory, match } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import webpackConfig from '../../webpack.config.client'
import Helmet from 'react-helmet'
import { END } from 'redux-saga'

import promiseReject from '../lib/promiseReject'
import { createRoutes } from '../common/routes'
import { configureStore } from '../common/store'

import Root from '../common/Root'
import saga from '../common/ducks/saga'
import * as articleActions from '../common/ducks/article/actions'
import * as pageActions from '../common/ducks/page/actions'

import * as config from './config'
import { renderHtmlPage, renderHtmlPageByServerRendering } from './htmlRender'

function prepareFetchingPromise (store, url) {
  const rootTask = store.runSaga(saga)

  store.dispatch(articleActions.fetchArticles())
  if (/\/me\//.test(url)) {
    store.dispatch(pageActions.fetchPages())
  }
  store.dispatch(END)

  return Promise.race([
    rootTask.done,
    promiseReject(config.QUERY_TIMEOUT, 'Time out')
  ])
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
    match({routes: createRoutes(history), location: req.url}, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        if (config.SERVER_RENDERING) {
          const store = configureStore(history)
          prepareFetchingPromise(store, req.url)
            .then(() => {
              const html = ReactDOMServer.renderToString(
                <Root store={store} renderProps={renderProps} type="server"/>
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
