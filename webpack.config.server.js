const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DEBUG = (process.env.NODE_ENV !== 'production')

const nodeModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((modules, mod) => {
    modules[mod] = 'commonjs ' + mod
    return modules
  }, {})

let myCSS = new ExtractTextPlugin('assets/styles/styles.css', {publicPath: '/assets/styles/'})
let vendorCSS = new ExtractTextPlugin('assets/styles/vendor.css', {publicPath: '/assets/styles/'})

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
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: DEBUG ? 'react-hot!babel' : 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css|\.scss$/,
        include: path.resolve(__dirname, 'src'),
        loader: myCSS.extract('css-loader?modules!sass-loader')
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src'),
        loader: vendorCSS.extract('css-loader')
      },
      {
        test: /\.(png|jpg)/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    vendorCSS,
    myCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG
      }
    })
  ],
  devtool: DEBUG ? 'eval' : null
}
