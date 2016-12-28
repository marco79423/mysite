const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const DEBUG = (process.env.NODE_ENV !== 'production')

const nodeModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((modules, mod) => {
    modules[mod] = 'commonjs ' + mod
    return modules
  }, {})


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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG
      }
    })
  ],
  devtool: DEBUG ? 'eval' : null
}
