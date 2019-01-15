import path from 'path'
import express from 'express'
import compression from 'compression'
import {Feed} from 'feed'
import axios from 'axios'
import escapeHtml from 'escape-html'

import * as config from '../src/imports/config'


const PORT = 3000

const app = express()
app.use(compression())

app.get('/atom.xml', function (req, res) {
  return axios.get(`${config.BACKEND_SERVER_URL}/api/articles/`)
    .then(res => res.data)
    .then(articles => {
      const feed = new Feed({
        ...config.FEED_TEMPLATE,
        updated: new Date(articles[0].date),
      })
      articles.forEach(article => {
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
      })
      res.send(feed.atom1())
    })
})

app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  {maxAge: '7d'},
))

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})


app.listen(PORT, (error) => {
  if (error) {
    return console.log('server error:', error)
  }

  console.log("listening on " + PORT + "...")
})
