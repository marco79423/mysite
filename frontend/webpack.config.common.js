const webpack = require('webpack')
const path = require('path')

const DEBUG = (process.env.NODE_ENV !== 'production')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      DEBUG: DEBUG,
      BACKEND_SERVER_URL: JSON.stringify(process.env.BACKEND_SERVER_URL),
      SITE_VERSION: JSON.stringify(process.env.SITE_VERSION),
      SITE_UPDATED_TIME: JSON.stringify(process.env.SITE_UPDATED_TIME)
    }
  })
]

if (!DEBUG) {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
}

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
  plugins: plugins
}
