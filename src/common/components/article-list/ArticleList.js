import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import ArticleListItem from '../article-list-item'
import Pagination from '../pagination'

import styles from './ArticleList.scss'

export default class ArticleList extends React.Component {
  static propTypes = {
     articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: React.PropTypes.string,
        title: React.PropTypes.string,
        summary: React.PropTypes.string
      })
    ),
    pageNum: React.PropTypes.number,
    pageSize: React.PropTypes.number,

    getPageLink: React.PropTypes.func
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
