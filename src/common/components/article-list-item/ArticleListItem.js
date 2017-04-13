import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import ArticleMeta from '../article-meta'
import ArticleContent from '../article-content'

import styles from './ArticleListItem.scss'

export default class ArticleListItem extends React.PureComponent {
  static PropTypes = {
    article: ImmutablePropTypes.contains({
      title: PropTypes.string.isRequired,
      summary: PropTypes.string
    })
  }

  render () {
    const {article} = this.props

    return (
      <article className={styles.root}>
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
        <ArticleContent content={article.get('summary')}/>
      </article>
    )
  }
}
