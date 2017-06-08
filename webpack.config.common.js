const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DEBUG = (process.env.NODE_ENV !== 'production')

const myCSS = new ExtractTextPlugin({filename: 'styles/styles.css', publicPath: '/assets/styles/'})
const vendorCSS = new ExtractTextPlugin({filename: 'styles/vendor.css', publicPath: '/assets/styles/'})

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: (DEBUG ? ['react-hot-loader'] : []).concat(['babel-loader'])
      },
      {
        test: /\.css|\.scss$/,
        include: path.resolve(__dirname, 'src'),
        use: myCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src'),
        use: vendorCSS.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|ico)/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    ]
  },
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
