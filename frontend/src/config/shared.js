export const AUTHOR_INFO = {
  name: '兩大類',
  email: 'marco79423@gmail.com'
}

export const SITE_NAME = '兩大類 x 兩大類 = 四大類'
export const HOST_URL = 'http://localhost:8000'
export const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL || HOST_URL

export const SITE_META = {
  viewport: 'width=device-width, initial-scale=1.0',

  keywords: 'Python,Javascript,網站設計,兩大類',
  description: '兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西',
  author: AUTHOR_INFO.name,

  'og:image': `${BACKEND_SERVER_URL}/static/resources/img/marco.jpg`,
  'og:description': '兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西',

  'fb:admins': '100000038752074',
  'fb:fb:app_id': '165574263590380',
  'google-site-verification': 'vVs2QVhF9I_65-WfH-RD2klXRwNA5hJT1VbICZv-0ZA'
}

export const SITE_LINK = {
  'shortcut icon': require('../shared/blog/img/favicon.ico')
}

export const COPYRIGHT = 'Copyright © 2017 - 兩大類'

export const MENU_ITEMS = {
  main: [
    {name: 'Python', url: '/articles/category/python/'},
    {name: '專案作品', url: '/articles/category/專案作品/'},
    {name: '程式設計', url: '/articles/category/程式設計/'},
    {name: 'UNIX & 工具', url: '/articles/category/unix-工具/'},
    {name: '遊記', url: '/articles/category/遊記/'},
    {name: '胡言亂語', url: '/articles/category/胡言亂語/'}
  ],
  extra: [
    {name: '閱讀計劃', url: '/me/閱讀計劃/'},
    {name: '實驗室', url: '/lab/'}
  ]
}

export const RECENT_ARTICLE_COUNT = 5

export const PAGE_SIZE = 10

export const COMMENT_CONFIG = {
  shortName: 'marco79423'
}

export const SITE_VERSION = process.env.SITE_VERSION || ""
export const SITE_UPDATED_TIME = process.env.SITE_UPDATED_TIME || ""
