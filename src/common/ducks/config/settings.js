export const SITE_NAME = '兩大類 x 兩大類 = 四大類'

export const SITE_META = {
  viewport: 'width=device-width, initial-scale=1.0',

  keywords: 'Python,Javascript,網站設計,兩大類',
  description: '兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西',
  author: '兩大類',

  'og:image': 'http://api.marco79423.net/static/resources/img/marco.jpg',
  'og:description': '兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西',

  'fb:admins': '100000038752074',
  'fb:fb:app_id': '165574263590380',
  'google-site-verification': 'Pid5nZRF1G0qE8W87MdFt6C5oQT8OIWRREXIxuWjik4'
}

export const LEFT_MENU_ITEMS = [
  {name: 'Python', url: '/articles/category/python/'},
  {name: '專案作品', url: '/articles/category/專案作品/'},
  {name: '程式設計', url: '/articles/category/程式設計/'},
  {name: 'UNIX & 工具', url: '/articles/category/unix-工具/'},
  {name: '胡言亂語', url: '/articles/category/胡言亂語/'}
]

export const RIGHT_MENU_ITEMS = [
  {name: '閱讀計劃', url: '/me/閱讀計劃/'},
  {name: '成功日記', url: '/me/成功日記/'}
]

export const ABOUT_ME = {
  socialLinks: [
    {name: 'GitHub', url: 'https://github.com/marco79423'},
    {name: 'Bitbucket', url: 'https://bitbucket.org/marco79423'},
    {name: 'facebook', url: 'https://www.facebook.com/marco79423'}
  ],
  quote: '能站著就別坐著，能走路就別騎車\n保持站起來的毅力和一步一腳印的耐心'
}

export const RECENT_ARTICLE_COUNT = 5

export const HOST_URL = 'http://marco79423.net'
export const API_SERVER_URL = 'http://localhost:8000/api'

export const PAGE_SIZE = 10

export const COMMENT_CONFIG = {
  shortName: 'marco79423'
}
