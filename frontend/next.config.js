const withMDX = require('@next/mdx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  publicRuntimeConfig: require('./runtimeConfig'),

  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  compiler: {
    emotion: true,
  },
}

const plugins = [
  withMDX({
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  })
]

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig)