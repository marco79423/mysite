/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: require('./runtimeConfig'),

  compiler: {
    emotion: true,
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'marco79423.net',
          },
        ],
        destination: 'https://blog.marco79423.net/:path*', // 新域名
        permanent: true,
      },
    ];
  },
}
