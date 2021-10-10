import fp from 'lodash/fp'
import {createSelector} from 'reselect'

import * as configSelectors from '../config/selectors'


export const getArticles = createSelector(
  [
    state => state.article.slugs.map(slug => state.article.items[slug]),
    configSelectors.getHostUrl,
  ],
  (articles, hostUrl) => articles
    .map(article => ({
      ...article,
      path: `/articles/${article.slug}`,
      url: `${hostUrl}/articles/${article.slug}`,
      date: new Date(article.date),
      modifiedDate: article.modifiedDate ? new Date(article.modifiedDate) : null,
    }))
)

export const getArticlesByCategory = queryCategory => createSelector(
  [
    getArticles
  ],
  (articles) => fp.flow(
    fp.filter(article => fp.flow(
      fp.some(category => !queryCategory || category.slug === queryCategory),
    )(article.categories))
  )(articles)
)

export const getArticle = slug => createSelector(
  [
    state => state.article.items,
    configSelectors.getHostUrl,
  ],
  (articleItems, hostUrl) => {
    const article = articleItems[slug]
    if (!article) {
      return null
    }

    return {
      ...article,
      path: `/articles/${article.slug}`,
      url: `${hostUrl}/articles/${article.slug}`,
      date: new Date(article.date),
      modifiedDate: article.modifiedDate ? new Date(article.modifiedDate) : null
    }
  }
)

export const getRecentArticles = createSelector(
  [
    getArticlesByCategory,
    configSelectors.getRecentArticleCount
  ],
  (articles, recentArticleCount) => fp.flow(
    fp.take(recentArticleCount),
  )(articles)
)
