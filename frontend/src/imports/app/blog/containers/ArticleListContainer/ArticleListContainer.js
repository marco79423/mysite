import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ArticleList from '../../components/content/ArticleList'

import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

@connect(
  (state, ownProps) => ({
    category: ownProps.params.category,
    articles: ownProps.params.category ? articleSelectors.getArticlesByCategory(state, ownProps) : articleSelectors.getArticles(state, ownProps),
    pageSize: configSelectors.getPageSize(state, ownProps),
    pageNum: +ownProps.params.pageNum || 1
  }),
  dispatch => ({
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  })
)
export default class ArticleListContainer extends React.Component {

  componentWillMount () {
    if (this.props.articles.length === 0) {
      this.props.fetchArticles()
    }
  }

  getPageLink = (pageNum) => {
    const {category} = this.props
    if (category) {
      return `/articles/category/${category}/page/${pageNum}/`
    } else {
      return `/articles/page/${pageNum}/`
    }
  }

  render () {
    return (
      <ArticleList
        articles={this.props.articles}
        pageSize={this.props.pageSize}
        pageNum={this.props.pageNum}
        getPageLink={this.getPageLink}
      />
    )
  }
}
