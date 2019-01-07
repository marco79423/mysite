import * as sharedConfig from './shared'

export const DEFAULT_PORT = 3000
export const QUERY_TIMEOUT = 10000
export const CACHE_TIMEOUT = '1 hour'

export const FEED_TEMPLATE = {
  title: sharedConfig.SITE_NAME,
  description: sharedConfig.SITE_META.description,
  id: sharedConfig.HOST_URL,
  link: sharedConfig.HOST_URL,
  // image: require('../common/img/logo.png'), TODO
  favicon: `${sharedConfig.HOST_URL}/favicon.ico`,
  copyright: sharedConfig.COPYRIGHT,
  updated: undefined,
  feedLinks: {
    atom: `${sharedConfig.HOST_URL}/atom.xml`,
    rss2: `${sharedConfig.HOST_URL}/rss2.xml`,
  },
  author: {
    name: sharedConfig.AUTHOR_INFO.name,
    email: sharedConfig.AUTHOR_INFO.email,
    link: sharedConfig.HOST_URL
  }
}
