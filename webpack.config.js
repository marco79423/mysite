const serverConfig = require('./webpack.config.server')
const clientConfig = require('./webpack.config.client')

const PRODUCTION = (process.env.NODE_ENV === 'production')

module.exports = [
  serverConfig
].concat(PRODUCTION ? [clientConfig] : [])
