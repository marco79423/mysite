const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DEBUG = (process.env.NODE_ENV !== 'production')

let myCSS = new ExtractTextPlugin('assets/styles/styles.css', {publicPath: '/assets/styles/'})
let vendorCSS = new ExtractTextPlugin('assets/styles/vendor.css', {publicPath: '/assets/styles/'})


module.exports = {
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
      test: /\.(png|jpg|ico)/,
      loader: 'url-loader?limit=100000'
    }
  ],
  plugins: [
    vendorCSS,
    myCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEBUG: DEBUG
      }
    })
  ]
}
