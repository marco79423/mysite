import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import ArticleList from '../../components/article-list'

import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

export class ArticleListContainer extends React.Component {
  static propTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string,
        summary: PropTypes.string
      })
    ).isRequired,
    pageNum: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,

    fetchArticles: PropTypes.func.isRequired
  }

  componentWillMount () {
    if (this.props.articles.isEmpty()) {
      this.props.fetchArticles()
    }
  }

  getPageLink = (pageNum) => {
    return `/articles/page/${pageNum}/`
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

const mapStateToProps = (state, ownProps) => {
  return {
    articles: articleSelectors.getArticles(state, ownProps),
    pageSize: configSelectors.getPageSize(state, ownProps),
    pageNum: +ownProps.params.pageNum || 1
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer)
