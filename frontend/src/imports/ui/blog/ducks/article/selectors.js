import fp from 'lodash/fp'
import {createSelector} from 'reselect'

import * as configSelectors from '../config/selectors'
import * as routingSelectors from '../router/selectors'


export const getArticles = (state) => fp.flow(
  fp.map(article => ({
    ...article,
    date: new Date(article.date),
    modifiedDate: article.modifiedDate ? new Date(article.modifiedDate) : null
  })),
)(state.article.items)

export const getArticlesByCategory = createSelector(
  [
    (state, props) => fp.get('match.params.category')(props) || fp.get('category')(props),
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
    getArticles,
    (state, props) => props.match.params.slug
  ],
  (articles, currentArticleSlug) => fp.flow(
    fp.find(article => article.slug === currentArticleSlug)
  )(articles)
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
