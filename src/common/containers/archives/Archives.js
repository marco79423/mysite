import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'

import styles from './Archives.scss'

export class Archives extends React.Component {
  static PropTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: React.PropTypes.string,
        title: React.PropTypes.string,
        date: React.PropTypes.any.isRequired
      })
    ),
    fetchArticles: React.PropTypes.func
  }

  componentWillMount () {
    if (this.props.articles.isEmpty()) {
      this.props.fetchArticles()
    }
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
                <td>{article.get('date').format('YYYY/MM/DD')}</td>
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

const mapStateToProps = (state, ownProps) => {
  return {
    articles: articleSelectors.getAllArticles(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archives)
