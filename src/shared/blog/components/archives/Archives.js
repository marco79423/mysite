import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Link from '../../../generic/components/Link/index'
import dateformat from 'dateformat'

import Loading from '../Loading/index'

import styles from './Archives.scss'

export default class Archives extends React.PureComponent {
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
      return (
        <section className={styles.archives}>
          <Loading/>
        </section>
      )
    }

    return (
      <section className={styles.archives}>
        <article>
          <header>
            <h1><Link to='/articles/archives/'>所有文章列表</Link></h1>
          </header>
          <table>
            <tbody>
            {articles.map(article => (
              <tr key={article.get('slug')}>
                <td>{dateformat(article.get('date'), 'yyyy/mm/dd')}</td>
                <td>
                  <Link to={`/articles/${article.get('slug')}/`}>{article.get('title')}</Link>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </article>
      </section>
    )
  }
}
