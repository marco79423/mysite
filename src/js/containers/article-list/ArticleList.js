import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import ArticleListItem from '../../components/article-list-item';
import Pagination from '../../components/pagination';

import * as articleActions from '../../ducks/article/actions';

import styles from './ArticleList.scss';

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
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillMount() {
    this.props.fetchArticles();
  }

  render() {
    const {articles, pageNum, maxPageNum} = this.props;
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const PAGE_SIZE = state.getIn(['config', 'PAGE_SIZE']);
  const pageNum = +ownProps.params.pageNum || 1;

  let articles = state.getIn(['article', 'items']);
  if (ownProps.params.category) {
    articles = articles.filter(article => article
      .get('categories')
      .some(category => category.get('slug') === ownProps.params.category));
  }
  return {
    pageNum,
    maxPageNum: Math.ceil(articles.count() / PAGE_SIZE),
    articles: articles.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
