const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/js/main.js'
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'assets/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'react-hot!babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css|\.scss$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader?modules!sass-loader'
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'index.html')
    })
  ],
  devtool: 'eval'
}