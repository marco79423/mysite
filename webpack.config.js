const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const DEBUG = (process.env.NODE_ENV !== 'production')

const nodeModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((modules, mod) => {
    modules[mod] = 'commonjs ' + mod
    return modules
  }, {})


module.exports = [
  {
    entry: [
      'babel-polyfill',
      './src/client/js/main.js'
    ].concat(DEBUG ? [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server'
    ] : []),
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: 'assets/bundle.js'
    },
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
        template: path.join(__dirname, 'src', 'client', 'html', 'index.html')
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          DEBUG
        }
      })
    ],
    devtool: DEBUG ? 'eval' : null
  },
  {
    entry: [
      'babel-polyfill',
      './src/server/index.js'
    ],
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: 'server.js'
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
    devtool: DEBUG ? 'eval' : null
  }
]