import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';

import styles from './RecentArticles.scss';


export default class RecentArticles extends React.Component {
  static PropTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: React.PropTypes.string,
        title: React.PropTypes.string
      })
    )
  };

  render() {
    const {articles} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.title}>最新文章</div>
        <div className={styles.hr}/>
        <div className={styles.articles}>
          {
            articles.map(article => (
              <Link key={article.get('slug')}
                    className={styles.article}
                    to={`/articles/${article.get('slug')}/`}>
                {article.get('title')}
              </Link>
            ))
          }
        </div>
        <div className={styles.hr}/>
      </div>
    );
  }
}
