const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const commonConfig = require('./webpack.config.common')

const DEBUG = (process.env.NODE_ENV !== 'production')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/server/index.js'
  ],
  output: {
    publicPath: '/',
    path: __dirname,
    filename: '__server.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((modules, mod) => {
      modules[mod] = 'commonjs ' + mod
      return modules
    }, {}),
  module: {
    loaders: commonConfig.loaders
  },
  plugins: commonConfig.plugins,
  devtool: DEBUG ? 'eval' : null
}
