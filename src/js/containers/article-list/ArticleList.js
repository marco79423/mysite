import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {connect} from 'react-redux'

import ArticleListItem from '../../components/article-list-item'
import Pagination from '../../components/pagination'

import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'

import styles from './ArticleList.scss'

export class ArticleList extends React.Component {
  static propTypes = {
    pageNum: React.PropTypes.number,
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: React.PropTypes.string,
        title: React.PropTypes.string,
        summary: React.PropTypes.string
      })
    ),
    fetchArticles: React.PropTypes.func
  }

  componentWillMount() {
    this.props.fetchArticles()
  }

  render() {
    const {articles, pageNum, maxPageNum} = this.props
    return (
      <div className={styles.root}>
        {
          articles.map(article => (
            <ArticleListItem key={article.get('slug')} article={article}/>
          ))
        }
        <Pagination
          current={pageNum}
          max={maxPageNum}
          makeLink={p => `/articles/page/${p}/`}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const pageNum = articleSelectors.getPageNum(state, ownProps)
  const maxPageNum = articleSelectors.getMaxPageNum(state, ownProps)
  const articles = articleSelectors.getArticles(state, ownProps)

  return {pageNum, maxPageNum, articles}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
