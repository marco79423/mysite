/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: require('./runtimeConfig'),

  compiler: {
    emotion: true,
  },
}
