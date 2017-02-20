import {createSelector} from 'reselect'
import moment from 'moment'

import * as configSelectors from '../config/selectors'


const _getCategory = (state, props) => props.params.category

export const getAllArticles = (state) => state
  .getIn(['article', 'items'])
  .map(article => article.merge({
    date: moment(article.date),
    modifiedDate: article.modifiedDate ? moment(article.modifiedDate) : null
  }))

const _getCurrentArticleSlug = (state, props) => props.params.slug

export const getArticle = createSelector(
  [getAllArticles, _getCurrentArticleSlug],
  (articles, currentArticleSlug) => articles.find(article => article.get('slug') === currentArticleSlug)
)

const _getArticlesByCategory = createSelector(
  [getAllArticles, _getCategory],
  (articles, category) => {
    if (category) {
      return articles.filter(article => article
        .get('categories')
        .some(c => c.get('slug') === category))
    }
    return articles
  }
)

export const getPageNum = (state, props) => +props.params.pageNum || 1

export const getArticles = createSelector(
  [
    getPageNum,
    _getArticlesByCategory,
    configSelectors.getPageSize
  ],
  (pageNum, articles, pageSize) => {
    return articles.slice((pageNum - 1) * pageSize, pageNum * pageSize)
  }
)

export const getMaxPageNum = createSelector(
  [_getArticlesByCategory, configSelectors.getPageSize],
  (articles, pageSize) => Math.ceil(articles.count() / pageSize)
)

export const getRecentArticles = createSelector(
  [
    getAllArticles,
    configSelectors.getRecentArticleCount
  ],
  (articles, recentArticleCount) => articles.take(recentArticleCount)
)
