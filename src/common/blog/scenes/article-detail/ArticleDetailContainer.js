import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import ArticleDetail from './components/article-detail'

import * as siteSelectors from '../../ducks/site/selectors'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

@connect(
  (state, ownProps) => ({
    siteConfig: siteSelectors.getArticleSiteHeadConfig(state, ownProps),
    article: articleSelectors.getArticle(state, ownProps),
    socialConfig: articleSelectors.getSocialConfig(state, ownProps),
    commentConfig: configSelectors.getCommentConfig(state)
  }),
  dispatch => ({
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  })
)
export default class ArticleContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    article: ImmutablePropTypes.map.isRequired,
    socialConfig: ImmutablePropTypes.map.isRequired,
    commentConfig: ImmutablePropTypes.map.isRequired,

    fetchArticles: PropTypes.func.isRequired
  }

  componentWillMount () {
    if (!this.props.article) {
      this.props.fetchArticles()
    }
  }

  render () {
    return (
      <ArticleDetail
        siteConfig={this.props.siteConfig}
        summaryMode={false}
        article={this.props.article}
        socialConfig={this.props.socialConfig}
        commentConfig={this.props.commentConfig}
      />
    )
  }
}

