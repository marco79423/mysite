import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import ArticleListItem from '../article-list-item'
import Pagination from '../pagination'

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
      <div className={styles.root}>
        {
          articles.slice((pageNum - 1) * pageSize, pageNum * pageSize).map(article => (
            <ArticleListItem key={article.get('slug')} article={article}/>
          ))
        }
        <Pagination
          current={pageNum}
          max={Math.ceil(articles.count() / pageSize)}
          makeLink={getPageLink}
        />
      </div>
    )
  }
}
