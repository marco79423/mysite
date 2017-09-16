import * as commonConfig from '../common/config'

export const DEFAULT_PORT = 3000
export const SERVER_RENDERING = true
export const QUERY_TIMEOUT = 10000
export const CACHE_TIMEOUT = '1 hour'

export const FEED_TEMPLATE = {
  title: commonConfig.SITE_NAME,
  description: commonConfig.SITE_META.description,
  id: commonConfig.HOST_URL,
  link: commonConfig.HOST_URL,
  // image: require('../common/img/logo.png'), TODO
  favicon: `${commonConfig.HOST_URL}/favicon.ico`,
  copyright: 'All rights reserved 2017, 兩大類',
  updated: undefined,
  feedLinks: {
    atom: `${commonConfig.HOST_URL}/atom.xml`,
    rss2: `${commonConfig.HOST_URL}/rss2.xml`,
  },
  author: {
    name: '兩大類',
    email: 'marco79423@gmail.com',
    link: commonConfig.HOST_URL
  }
}
