import {createSelector} from 'reselect'
import moment from 'moment'

const _getCategory = (state, props) => props.params.category

const _getPageSize = (state) => state.getIn(['config', 'PAGE_SIZE'])
const _getRecentArticleCount = (state) => state.getIn(['config', 'RECENT_ARTICLE_COUNT'])

export const getAllArticles = (state) => state
  .getIn(['article', 'items'])
  .map(article => article.merge({
    date: moment(article.date),
    modifiedDate: article.modifiedDate ? moment(article.modifiedDate) : null
  }))

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
    _getPageSize
  ],
  (pageNum, articles, pageSize) => {
    return articles.slice((pageNum - 1) * pageSize, pageNum * pageSize)
  }
)

export const getMaxPageNum = createSelector(
  [getArticles, _getPageSize],
  (articles, pageSize) => Math.ceil(articles.count() / pageSize)
)

export const getRecentArticles = createSelector(
  [
    getAllArticles,
    _getRecentArticleCount
  ],
  (articles, recentArticleCount) => articles.take(recentArticleCount)
)
