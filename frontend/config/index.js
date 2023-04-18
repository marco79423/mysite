import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()


export const AuthorInfo = {
  name: '兩大類',
  email: 'marco79423@gmail.com'
}

export const SiteName = '大類的技術手記'
export const SiteDescription = '兩大類的個人網站，主要都是在寫學習心得(Python, Javascript, 網站設計, 程式技能等)、作品和一些胡言亂語的東西'

export const HostUrl = 'https://marco79423.net'
export const BackendServerURL = publicRuntimeConfig.BackendServerUrl

export const Copyright = `Copyright © ${new Date().getFullYear()} - 兩大類`

export const MenuItems = {
  main: [
    {name: '技術分享', url: '/articles/category/技術分享/'},
    {name: '專案作品', url: '/articles/category/專案作品/'},
    {name: '隨手記', url: '/articles/category/隨手記/'},
  ],
  extra: [
    // {name: '西卡神教福音', url: 'https://jessigod.marco79423.net/?utm_source=blog'},
    // {name: 'Jessiclient', url: 'https://jessiclient.marco79423.net/?utm_source=blog'},
    // {name: '啪唧工具包', url: 'https://paji-toolset.net/?utm_source=blog'},
  ]
}

export const RelatedSites = [
  {
    name: '啪唧工具包',
    url: 'https://paji-toolset.net/?utm_source=blog',
  },
  {
    name: 'Jessiclient - Websocket 客戶端',
    url: 'https://jessiclient.marco79423.net/?utm_source=blog',
  },
  {
    name: '西卡神教福音 - 西卡神福音傳播',
    url: 'https://jessigod.marco79423.net/?utm_source=blog',
  },
]

export const RecentArticleCount = 5
export const PageSize = 10

export const CommentConfig = {
  shortName: 'marco79423'
}

export const FeedTemplate = {
  title: SiteName,
  description: SiteDescription,
  id: HostUrl + '/',
  link: HostUrl + '/',
  image: `${HostUrl}/img/logo@250x250.jpg`,
  favicon: `${HostUrl}/favicon.ico`,
  copyright: Copyright,
  updated: null,
  feedLinks: {
    atom: `${HostUrl}/api/atom.xml`,
  },
  author: {
    name: AuthorInfo.name,
    email: AuthorInfo.email,
    link: HostUrl
  }
}

export const GTagTrackerId = publicRuntimeConfig.GtagTrackerID
