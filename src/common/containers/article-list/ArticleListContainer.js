import * as React from 'react'
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
        slug: React.PropTypes.string,
        title: React.PropTypes.string,
        summary: React.PropTypes.string
      })
    ).isRequired,
    pageNum: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,

    fetchArticles: React.PropTypes.func.isRequired
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
