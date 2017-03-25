import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import SiteHead from '../../components/site-head'
import ArticleMeta from '../../components/article-meta'
import ArticleContent from '../../components/article-content'
import SocialShare from '../../components/social-share'
import ArticleComment from '../../components/article-comment'
import * as siteSelectors from '../../ducks/site/selectors'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

import styles from './Article.scss'

export class Article extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map,
    article: ImmutablePropTypes.contains({
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.content,
      rawSummary: React.PropTypes.string
    }),
    socialConfig: ImmutablePropTypes.map,
    commentConfig: ImmutablePropTypes.map
  }

  componentWillMount () {
    if (!this.props.article) {
      this.props.fetchArticles()
    }
  }

  render () {
    const {article, socialConfig, commentConfig} = this.props
    if (!article) {
      return <article>讀取中……</article>
    }

    return (
      <article className={styles.root}>
        <SiteHead config={this.props.siteConfig}/>
        <div>
          <header className={styles.header}>
            <Link className={styles.link} to={`/articles/${article.get('slug')}/`}>{article.get('title')}</Link>
          </header>
          <ArticleMeta
            categories={article.get('categories')}
            date={article.get('date')}
            modifiedDate={article.get('modifiedDate')}
          />
        </div>
        <ArticleContent content={article.get('content')}/>
        <SocialShare config={socialConfig}/>
        <ArticleComment config={commentConfig}/>
      </article>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article)
