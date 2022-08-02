/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: require('./runtimeConfig'),

  compiler: {
    styledComponents: true,
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
