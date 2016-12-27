const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')


let config = {
  entry: [
    'babel-polyfill',
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
        loader: 'babel',
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
    }),
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: (process.env.NODE_ENV !== 'production')
      }
    })
  ]
}


if (process.env.NODE_ENV !== 'production') {
  config.entry.push('webpack-dev-server/client?http://0.0.0.0:3000')
  config.entry.push('webpack/hot/only-dev-server')
  config.module.loaders[0].loader = 'react-hot!babel'
  config.devtool = 'eval'
}

module.exports = config
