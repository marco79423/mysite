import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './Content.scss';

import ArticleListItem from '../article-list-item';


export default class Content extends React.Component {
    static PropTypes = {
        articles: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                slug: React.PropTypes.number.isRequired,
                title: React.PropTypes.string.isRequired,
                summary: React.PropTypes.string
            })
        ),
        toArticlePage: React.PropTypes.func.isRequired
    };

    render() {
        const { articles, toArticlePage } = this.props;
        return (
            <div className={styles.root}>
                {
                    articles.map(article => (
                        <ArticleListItem
                            key={article.get('slug')}
                            onTitleClicked={() => toArticlePage(article.get('slug'))}
                            article={article}
                        />
                    ))
                }
            </div>
        );
    }
}
