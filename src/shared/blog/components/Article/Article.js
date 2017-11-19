import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Link from '../../../generic/components/Link'
import dateformat from 'dateformat'

import Loading from '../Loading'
import SocialShare from './SocialShare'
import ArticleComment from './ArticleComment'
import ArticleContent from '../ArticleContent'

import styles from './Article.scss'

export default class Article extends React.PureComponent {
  static PropTypes = {
    summaryMode: PropTypes.bool,
    article: ImmutablePropTypes.contains({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      categories: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })).isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      modifiedDate: PropTypes.instanceOf(Date),
      content: PropTypes.any.isRequired,
      summary: PropTypes.string.isRequired
    }),
    socialConfig: ImmutablePropTypes.map,
    commentConfig: ImmutablePropTypes.map
  }

  renderMetadata = () => {
    const {article} = this.props
    return (
      <ul className={styles.metadata}>
        <li>分類：
          <ul className={styles.categories}>
            {article.get('categories').map(category => (
              <li key={category.get('slug')}>
                <Link to={`/articles/category/${category.get('slug')}/`}>{category.get('name')}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li>發表時間：{dateformat(article.get('date'), 'yyyy/mm/dd')}</li>
        {article.get('modifiedDate') && <li>最後更新：{dateformat(article.get('modifiedDate'), 'yyyy/mm/dd')}</li>}
      </ul>
    )
  }

  renderSummary = () => {
    return <ArticleContent content={this.props.article.get('summary')}/>
  }

  renderContent = () => {
    const {article, socialConfig, commentConfig} = this.props
    return [
      <ArticleContent key="article-content" content={article.get('content')}/>,
      <SocialShare  key="social-share" config={socialConfig}/>,
      <ArticleComment key="comment" config={commentConfig}/>
    ]
  }

  render () {
    const {article, summaryMode} = this.props
    if (!article) {
      return (
        <article className={styles.article}>
          <Loading/>
        </article>
      )
    }

    return (
      <article className={styles.article}>
        <header>
          <h1><Link to={`/articles/${article.get('slug')}/`}>{article.get('title')}</Link></h1>
          {this.renderMetadata()}
        </header>
        {summaryMode ? this.renderSummary() : this.renderContent()}
      </article>
    )
  }
}

