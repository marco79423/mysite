const webpack = require('webpack')
const path = require('path')

const DEBUG = (process.env.NODE_ENV !== 'production')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      DEBUG: DEBUG,
      BACKEND_SERVER_URL: JSON.stringify(process.env.BACKEND_SERVER_URL)
    }
  })
]

if (!DEBUG) {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
}

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'immutable$': path.join(__dirname, 'node_modules/immutable/dist/immutable.min.js')
    }
  },
  plugins: plugins,
  devtool: DEBUG ? 'eval' : false,
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
  }
}
