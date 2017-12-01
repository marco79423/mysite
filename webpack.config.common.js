const webpack = require('webpack')
const path = require('path')

const DEBUG = (process.env.NODE_ENV !== 'production')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|ico)/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader',
        options: {
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: DEBUG
      }
    })
  ]
}
