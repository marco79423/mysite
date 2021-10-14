import axios from 'axios'
import {Feed} from 'feed'
import escapeHtml from 'escape-html'

import * as config from '../../config'

export default async function (req, res) {
  const resp = await axios.get(`${config.BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data.data

  const feed = new Feed({
    ...config.FEED_TEMPLATE,
    updated: articles.length > 0 ? new Date(articles[0].date) : new Date(),
  })

  for (const article of articles) {
    feed.addItem({
      title: escapeHtml(article.title),
      id: encodeURI(`${config.HOST_URL}/articles/${article.slug}/`),
      link: encodeURI(`${config.HOST_URL}/articles/${article.slug}/`),
      date: new Date(article.date),
      author: [
        config.FEED_TEMPLATE.author
      ],
      description: escapeHtml(article.rawSummary),
      content: escapeHtml(article.content),
    })
  }

  res.status(200).send(feed.atom1())
}
