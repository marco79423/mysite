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
    rules: commonConfig.rules
  },
  plugins: commonConfig.plugins.concat(DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ] : []),
  devtool: DEBUG ? 'eval' : false
}
