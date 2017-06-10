import express from 'express'
import apicache from 'apicache'
import compression from 'compression'
import path from 'path'
import { argv } from 'yargs'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../../webpack.config.client'

import * as config from './config'
import renderHtmlPage from './renderHtmlPage'

function setDevMiddleware (app) {
  const compiler = webpack(webpackConfig)
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'dist',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }))
  app.use(webpackHotMiddleware(compiler))
  app.use((req, res) => renderHtmlPage(req, res))
}

function setProdMiddleware (app) {
  app.use(apicache.middleware(config.CACHE_TIMEOUT))
  app.use(compression())
  app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')))
  app.use((req, res) => renderHtmlPage(req, res))
}

export default function startServer () {
  const host = '0.0.0.0'
  const port = +argv.port || config.DEFAULT_PORT

  const app = express()
  if (process.env.DEBUG) {
    setDevMiddleware(app)
  } else {
    setProdMiddleware(app)
  }

  app.listen(port, host, () => {
    console.log(`Server listening on port ${port}`)
  })
}
