const path = require('path')
const webpack = require('webpack')

const clientConfig = require('./webpack.config.client')


clientConfig.module.rules.push({
  test: /\.jsx?$/,
  include: path.join(__dirname, 'src'),
  exclude: /.*Spec\.jsx/,
  enforce: 'post',
  loader: 'istanbul-instrumenter-loader'
})

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      {pattern: 'src/**/*Spec.js', watched: false}
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    webpack: clientConfig,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    concurrency: Infinity,
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  })
}
