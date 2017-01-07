const webpack = require('webpack')
const path = require('path')

const commonConfig = require('./webpack.config.common')

const DEBUG = (process.env.NODE_ENV !== 'production')


module.exports = {
  entry: [
    'babel-polyfill',
    './src/client/main.js'
  ].concat(DEBUG ? [
    'webpack-hot-middleware/client'
  ] : []),
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'assets/bundle.js'
  },
  module: {
    loaders: commonConfig.loaders
  },
  plugins: commonConfig.plugins.concat(DEBUG ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : []),
  devtool: DEBUG ? 'eval' : null
}
