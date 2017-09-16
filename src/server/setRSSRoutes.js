import Feed from 'feed'

import * as commonConfig from '../common/config'
import * as config from './config'

export default function setRSSRoutes (app) {
  app.get('/atom.xml', function (req, res) {
    return fetch(`${commonConfig.BACKEND_SERVER_URL}/api/articles/`)
      .then(res => res.json())
      .then(articles => {
        const feed = new Feed({
          ...config.FEED_TEMPLATE,
          updated: new Date(articles[0].date),
        })
        articles.forEach(article => {
          feed.addItem({
            title: article.title,
            id: article.slug,
            link: `${commonConfig.HOST_URL}/articles/${article.slug}/`,
            description: article.raw_summary,
            content: article.content,
            author: [
              config.FEED_TEMPLATE.author
            ],
            date: new Date(article.date),
          })
        })
        res.send(feed.atom1())
      })
  })

  app.get('/rss.xml', function (req, res) {
    return fetch(`${commonConfig.BACKEND_SERVER_URL}/api/articles/`)
      .then(res => res.json())
      .then(articles => {
        const feed = new Feed({
          ...config.FEED_TEMPLATE,
          updated: new Date(articles[0].date),
        })
        articles.forEach(article => {
          feed.addItem({
            title: article.title,
            id: article.slug,
            link: `${commonConfig.HOST_URL}/articles/${article.slug}/`,
            description: article.raw_summary,
            content: article.content,
            author: [
              config.FEED_TEMPLATE.author
            ],
            date: new Date(article.date),
          })
        })
        res.send(feed.rss2())
      })
  })
}
