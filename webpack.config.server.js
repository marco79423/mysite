const fs = require('fs')

const commonConfig = require('./webpack.config.common')

module.exports = {
  entry: './src/server/index.js',
  output: {
    path: __dirname,
    filename: '__server.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((modules, mod) => {
      modules[mod] = 'commonjs ' + mod
      return modules
    }, {}),
  module: commonConfig.module,
  plugins: commonConfig.plugins
}
