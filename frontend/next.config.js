module.exports = {
  experimental: {
    craCompat: true,
  },

  publicRuntimeConfig: require('./runtimeConfig'),

  // Remove this to leverage Next.js' static image handling
  // read more here: https://nextjs.org/docs/api-reference/next/image
  images: {
    disableStaticImages: true
  }
}
