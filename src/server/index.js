import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import 'isomorphic-fetch';
import React from 'react'
import {RouterContext, match, createMemoryHistory} from 'react-router'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server';
import webpackConfig from '../../webpack.config.client'

import {createRoutes} from '../client/containers/app/routes'
import {configureStore} from '../common/store'
import * as articleActions from '../client/ducks/article/actions'
import * as pageActions from '../client/ducks/page/actions'

const app = express()
const port = 3000


function renderFullPage(html, state) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>兩大類 x 兩大類 = 四大類</title>
        <link href="/assets/styles/styles.css" rel="stylesheet">
        <link href="/assets/styles/vendor.css" rel="stylesheet">
    </head>
    <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(state.toJS())}
        </script>
        <script type="text/javascript" src="/assets/bundle.js"></script>
    </body>
    </html>
  `
}

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
            const html = renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            );
            res.status(200).send(renderFullPage(html, store.getState()))
          })
      } else {
        res.status(404).send('Not found')
      }
    })
  })
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`)
})
