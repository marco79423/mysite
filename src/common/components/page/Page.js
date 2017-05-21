import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import Loading from '../loading'
import ArticleContent from '../article-content'

import styles from './Page.scss'

export default class Page extends React.PureComponent {
  static PropTypes = {
    page: ImmutablePropTypes.contains({
      app: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.content
    })
  }

  render () {
    const {page} = this.props
    if (!page) {
      return (
        <article className={styles.root}>
          <Loading />
        </article>
      )
    }

    return (
      <article className={styles.root}>
        <div>
          <header className={styles.header}>
            <Link className={styles.link} to={`/${page.get('app')}/${page.get('slug')}/`}>{page.get('title')}</Link>
          </header>
        </div>
        <ArticleContent content={page.get('content')}/>
      </article>
    )
  }
}
