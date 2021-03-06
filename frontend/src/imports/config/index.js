export const AUTHOR_INFO = {
  name: '兩大類',
  email: 'marco79423@gmail.com'
}

export const SITE_NAME = '大類的技術筆記'
export const HOST_URL = 'https://marco79423.net'
export const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL || `${HOST_URL}/backend`

export const SITE_META = {
  keywords: 'Python,Javascript,網站設計,兩大類',
  description: '兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西',
  author: AUTHOR_INFO.name,

  'og:image': `${BACKEND_SERVER_URL}/img/logo@250x250.jpg`,
  'og:description': '兩大類的技術筆記，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西',

  'fb:admins': '100000038752074',
  'fb:fb:app_id': '165574263590380',
  'google-site-verification': 'vVs2QVhF9I_65-WfH-RD2klXRwNA5hJT1VbICZv-0ZA'
}

export const SITE_LINK = {}

export const COPYRIGHT = `Copyright © ${new Date().getFullYear()} - 兩大類`

export const MENU_ITEMS = {
  main: [
    {name: 'Python', url: '/articles/category/python/'},
    {name: '專案作品', url: '/articles/category/專案作品/'},
    {name: '程式設計', url: '/articles/category/程式設計/'},
    {name: 'UNIX & 工具', url: '/articles/category/unix-工具/'},
  ],
  extra: [
    {name: '實驗室', url: '/lab/'}
  ]
}

export const RELATED_SITES = [
  {
    name: '類 Me 生活趣',
    url: 'http://life.marco79423.net/',
  },
  {
    name: 'Jessiclient',
    url: 'http://jessiclient.marco79423.net/',
  },
  {
    name: 'Jessigod',
    url: 'http://jessigod.marco79423.net/',
  },
]

export const RECENT_ARTICLE_COUNT = 5

export const PAGE_SIZE = 10

export const COMMENT_CONFIG = {
  shortName: 'marco79423'
}

export const SITE_VERSION = process.env.REACT_APP_SITE_VERSION || ''
export const SITE_UPDATED_TIME = process.env.REACT_APP_SITE_UPDATED_TIME || ''

export const DEFAULT_PORT = 3000
export const QUERY_TIMEOUT = 10000
export const CACHE_TIMEOUT = '1 hour'

export const FEED_TEMPLATE = {
  title: SITE_NAME,
  description: SITE_META.description,
  id: HOST_URL + '/',
  link: HOST_URL + '/',
  image: `${HOST_URL}/img/logo@250x250.jpg`,
  favicon: `${HOST_URL}/favicon.ico`,
  copyright: COPYRIGHT,
  updated: undefined,
  feedLinks: {
    atom: `${HOST_URL}/atom.xml`,
  },
  author: {
    name: AUTHOR_INFO.name,
    email: AUTHOR_INFO.email,
    link: HOST_URL
  }
}

export const GTAG_TRACKER_ID = 'UA-38552387-1'
