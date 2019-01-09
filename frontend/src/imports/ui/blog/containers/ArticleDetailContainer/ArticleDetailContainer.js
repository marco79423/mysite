import React from 'react'
import {connect} from 'react-redux'

import ArticleDetail from '../../components/content/ArticleDetail'

import * as siteSelectors from '../../ducks/site/selectors'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

export class ArticleDetailContainer extends React.Component {

  componentWillMount() {
    if (!this.props.article) {
      this.props.fetchArticles()
    }
  }

  render() {
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

export default connect(
  (state, ownProps) => ({
    siteConfig: siteSelectors.getArticleSiteHeadConfig(state, ownProps),
    article: articleSelectors.getArticle(state, ownProps),
    socialConfig: articleSelectors.getSocialConfig(state, ownProps),
    commentConfig: configSelectors.getCommentConfig(state)
  }),
  dispatch => ({
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  })
)(ArticleDetailContainer)
