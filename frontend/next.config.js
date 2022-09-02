/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: require('./runtimeConfig'),

  compiler: {
    emotion: true,
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
