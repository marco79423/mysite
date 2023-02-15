import fetchJSON from './fetchJSON'
import {BackendServerURL, HostUrl, RecentArticleCount} from '../config'
import fp from 'lodash/fp'

export async function fetchArticles() {
  const resp = await fetchJSON(`${BackendServerURL}/api/articles/`)
  const articles = resp.data
  return articles
    .map(article => ({
      ...article,
      path: `/articles/${article.slug}`,
      url: `${HostUrl}/articles/${article.slug}`,
    }))
}

export async function fetchArticle(slug) {
  const resp = await fetchJSON(`${BackendServerURL}/api/articles/${slug}`)
  const article = resp.data
  return {
    ...article,
    path: `/articles/${article.slug}`,
    url: `${HostUrl}/articles/${article.slug}`,
  }
}

export async function fetchRecentArticles() {
  const articles = await fetchArticles()
  return await fp.flow(
    fp.take(RecentArticleCount),
  )(articles)
}