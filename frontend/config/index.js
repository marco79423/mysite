import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()


export const AUTHOR_INFO = {
  name: '兩大類',
  email: 'marco79423@gmail.com'
}

export const SITE_NAME = '大類的技術手記'
export const SITE_DESCRIPTION = '兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西'

export const HOST_URL = 'https://marco79423.net'
export const BACKEND_SERVER_URL = publicRuntimeConfig.BackendServerUrl

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
  ]
}

export const RELATED_SITES = [
  {
    name: 'Jessiclient - Websocket 客戶端',
    url: 'https://jessiclient.marco79423.net/',
  },
  {
    name: '西卡神教福音 - 西卡神福音傳播',
    url: 'https://jessigod.marco79423.net/',
  },
]

export const RECENT_ARTICLE_COUNT = 5

export const PAGE_SIZE = 10

export const COMMENT_CONFIG = {
  shortName: 'marco79423'
}

export const FEED_TEMPLATE = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  id: HOST_URL + '/',
  link: HOST_URL + '/',
  image: `${HOST_URL}/img/logo@250x250.jpg`,
  favicon: `${HOST_URL}/favicon.ico`,
  copyright: COPYRIGHT,
  updated: null,
  feedLinks: {
    atom: `${HOST_URL}/api/atom.xml`,
  },
  author: {
    name: AUTHOR_INFO.name,
    email: AUTHOR_INFO.email,
    link: HOST_URL
  }
}

export const GTAG_TRACKER_ID = publicRuntimeConfig.GtagTrackerID
