import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import Article from '../../components/article'

import * as siteSelectors from '../../ducks/site/selectors'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

export class ArticleContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    article: ImmutablePropTypes.contains({
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.content,
      rawSummary: React.PropTypes.string
    }).isRequired,
    socialConfig: ImmutablePropTypes.map.isRequired,
    commentConfig: ImmutablePropTypes.map.isRequired,

    fetchArticles: React.PropTypes.func.isRequired
  }

  componentWillMount () {
    if (!this.props.article) {
      this.props.fetchArticles()
    }
  }

  render () {
    return (
      <Article
        siteConfig={this.props.siteConfig}
        article={this.props.article}
        socialConfig={this.props.socialConfig}
        commentConfig={this.props.commentConfig}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    siteConfig: siteSelectors.getArticleSiteHeadConfig(state, ownProps),
    article: articleSelectors.getArticle(state, ownProps),
    socialConfig: articleSelectors.getSocialConfig(state, ownProps),
    commentConfig: configSelectors.getCommentConfig(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)
