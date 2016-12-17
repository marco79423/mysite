const path = require('path');
const webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon'],
    files: ['src/js/test.js'],
    exclude: [],
    preprocessors: {
      'src/js/test.js': ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    webpack: {
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
        ],
        postLoaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    singleRun: false,
    concurrency: Infinity,
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
};