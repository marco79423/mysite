import fp from 'lodash/fp'
import {createSelector} from 'reselect'

import * as configSelectors from '../config/selectors'
import * as routingSelectors from '../router/selectors'


export const getArticles = (state) => fp.flow(
  fp.map(slug => state.article.items[slug]),
  fp.map(article => ({
    ...article,
    date: new Date(article.date),
    modifiedDate: article.modifiedDate ? new Date(article.modifiedDate) : null
  })),
)(state.article.slugs)

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

export const getArticle = createSelector(
  [
    state => state.article.items,
    (state, props) => props.match.params.slug
  ],
  (articleItems, currentArticleSlug) => {
    const article = articleItems[currentArticleSlug]
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

export const getSocialConfig = createSelector(
  [
    routingSelectors.getCurrentUrl,
    getArticle
  ],
  (currentUrl, article) => ({
    shareUrl: currentUrl,
    title: article ? article.title : currentUrl
  })
)
