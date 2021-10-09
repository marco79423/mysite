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

export const getArticlesByCategory = createSelector(
  [
    (state, props) => fp.get('match.params.category')(props),
    getArticles
  ],
  (queryCategory, articles) => fp.flow(
    fp.filter(article => fp.flow(
      fp.some(category => !queryCategory || category.slug === queryCategory),
    )(article.categories))
  )(articles)
)

export const getArticle = slug => createSelector(
  [
    state => state.article.items,
  ],
  (articleItems) => {
    const article = articleItems[slug]
    if (!article) {
      return null
    }

    return {
      ...article,
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
