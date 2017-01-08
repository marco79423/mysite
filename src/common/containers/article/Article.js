import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import ArticleMeta from '../../components/article-meta'
import ArticleContent from '../../components/article-content'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'

import styles from './Article.scss'


export class Article extends React.Component {
  static PropTypes = {
    article: ImmutablePropTypes.contains({
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.content
    })
  }

  componentWillMount() {
    if (!this.props.article) {
      this.props.fetchArticles()
    }
  }

  render() {
    const {article} = this.props
    if (!article) {
      return <article>讀取中……</article>
    }

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
        <ArticleContent content={article.get('content')}/>
      </article>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article: articleSelectors.getArticle(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
