import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Pagination from './pagination'

import Article from '../../../../components/article'

import styles from './ArticleList.scss'

export default class ArticleList extends React.PureComponent {
  static propTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string,
        summary: PropTypes.string
      })
    ),
    pageNum: PropTypes.number,
    pageSize: PropTypes.number,

    getPageLink: PropTypes.func
  }

  render () {
    const {articles, pageNum, pageSize, getPageLink} = this.props
    return (
      <section className={styles.articleList}>
        <ul className={styles.articleContainer}>
          {
            articles.slice((pageNum - 1) * pageSize, pageNum * pageSize).map(article => (
              <li key={article.get('slug')}>
                <Article summaryMode={true} article={article}/>
              </li>
            ))
          }
        </ul>

        <Pagination
          current={pageNum}
          max={Math.ceil(articles.count() / pageSize)}
          makeLink={getPageLink}
        />
      </section>
    )
  }
}
