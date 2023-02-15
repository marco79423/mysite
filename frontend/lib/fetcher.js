import fetchJSON from './fetchJSON'
import {BACKEND_SERVER_URL, HOST_URL, RECENT_ARTICLE_COUNT} from '../config'
import fp from 'lodash/fp'

export async function fetchArticles() {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data
  return articles
    .map(article => ({
      ...article,
      path: `/articles/${article.slug}`,
      url: `${HOST_URL}/articles/${article.slug}`,
    }))
}

export async function fetchArticle(slug) {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/${slug}`)
  const article = resp.data
  return {
    ...article,
    path: `/articles/${article.slug}`,
    url: `${HOST_URL}/articles/${article.slug}`,
  }
}

export async function fetchRecentArticles() {
  const articles = await fetchArticles()
  return await fp.flow(
    fp.take(RECENT_ARTICLE_COUNT),
  )(articles)
}