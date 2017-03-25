import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import SiteHead from '../../components/site-head'
import ArticleListItem from '../../components/article-list-item'
import Pagination from '../../components/pagination'

import * as siteSelectors from '../../ducks/site/selectors'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'

import styles from './ArticleList.scss'

export class ArticleList extends React.Component {
  static propTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
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

  componentWillMount () {
    if (this.props.articles.isEmpty()) {
      this.props.fetchArticles()
    }
  }

  render () {
    const {articles, pageNum, maxPageNum} = this.props
    return (
      <div className={styles.root}>
        <SiteHead config={this.props.siteConfig}/>
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
  return {
    siteConfig: siteSelectors.getSiteHeadConfig(state, ownProps),
    pageNum: articleSelectors.getPageNum(state, ownProps),
    maxPageNum: articleSelectors.getMaxPageNum(state, ownProps),
    articles: articleSelectors.getArticles(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
