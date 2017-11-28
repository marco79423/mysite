const webpack = require('webpack')
const path = require('path')

const commonConfig = require('./webpack.config.common')

const DEBUG = (process.env.NODE_ENV !== 'production')

module.exports = {
  entry: [
    './src/client/index.js'
  ].concat(DEBUG ? ['webpack-hot-middleware/client'] : []),
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'bundle.js'
  },
  module: commonConfig.module,
  resolve: {
    alias: {
      'immutable$': path.join(__dirname, 'node_modules/immutable/dist/immutable.min.js')
    }
  },
  plugins: commonConfig.plugins.concat(DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ] : []),
  devtool: DEBUG ? 'eval' : false
}
