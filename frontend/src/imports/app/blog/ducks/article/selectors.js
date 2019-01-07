import * as Immutable from 'immutable'
import { createSelector } from 'reselect'
import get from 'lodash/get'

import * as configSelectors from '../config/selectors'
import * as routingSelectors from '../routing/selectors'

export const getArticles = (state) => state
  .getIn(['article', 'items'])
  .map(article => article
    .merge({
      date: new Date(article.get('date')),
      modifiedDate: article.get('modifiedDate') ? new Date(article.get('modifiedDate')) : null
    })
  )

export const getArticlesByCategory = createSelector(
  [
    (state, props) => get(props, 'params.category') || get(props, 'category'),
    getArticles
  ],
  (category, articles) => articles.filter(article => article
    .get('categories')
    .some(c => !category || c.get('slug') === category))
)

export const getArticle = createSelector(
  [
    getArticles,
    (state, props) => props.params.slug
  ],
  (articles, currentArticleSlug) => articles.find(article => article.get('slug') === currentArticleSlug)
)

export const getRecentArticles = createSelector(
  [
    getArticlesByCategory,
    configSelectors.getRecentArticleCount
  ],
  (articles, recentArticleCount) => articles.take(recentArticleCount)
)

export const getSocialConfig = createSelector(
  [
    routingSelectors.getCurrentUrl,
    getArticle
  ],
  (currentUrl, article) => Immutable.Map({
    shareUrl: currentUrl,
    title: article ? article.get('title') : currentUrl
  })
)
