const webpack = require('webpack')
const path = require('path')

const commonConfig = require('./webpack.config.common')

const DEBUG = (process.env.NODE_ENV !== 'production')

module.exports = {
  entry: (DEBUG ? ['react-hot-loader/patch', 'webpack-hot-middleware/client'] : []).concat(['./src/client/index.js']),
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
  plugins: commonConfig.plugins.concat(DEBUG ? [new webpack.HotModuleReplacementPlugin()] : []),
  devtool: DEBUG ? 'eval' : false
}
