import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import dateformat from 'dateformat'

import styles from './Archives.scss'

export default class Archives extends React.Component {
  static PropTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.any.isRequired
      })
    )
  }

  render () {
    const {articles} = this.props
    if (articles.isEmpty()) {
      return <article>讀取中……</article>
    }

    return (
      <article className={styles.root}>
        <div>
          <header className={styles.header}>
            所有文章列表
          </header>
          <table className={styles.table}>
            <tbody>
            {articles.map(article => (
              <tr key={article.get('slug')}>
                <td>{dateformat(article.get('date'), 'yyyy/mm/dd')}</td>
                <td>
                  <Link className={styles.link} to={`/articles/${article.get('slug')}/`}>{article.get('title')}</Link>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </article>
    )
  }
}
