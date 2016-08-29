var webpack = require('webpack');
var path = require('path');


module.exports = {
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src/js/main.js'
    ],
    output: {
        publicPath: '/assets/',
        path: path.join(__dirname, '/assets'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'react-hot!babel',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            },
            {
                test: /\.png/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    devtool: 'eval',
};