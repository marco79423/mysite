import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import SiteHead from '../site-head'
import ArticleMeta from '../article-meta'
import ArticleContent from '../article-content'
import SocialShare from '../social-share'
import ArticleComment from '../article-comment'

import styles from './Article.scss'

export default class ArticleContainer extends React.PureComponent {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    article: ImmutablePropTypes.contains({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.content,
      rawSummary: PropTypes.string
    }),
    socialConfig: ImmutablePropTypes.map.isRequired,
    commentConfig: ImmutablePropTypes.map.isRequired
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

