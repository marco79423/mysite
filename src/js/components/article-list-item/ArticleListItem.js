import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Link from '../link';

import styles from './ArticleListItem.scss';


export default class ArticleListItem extends React.Component {
    static PropTypes = {
        article: ImmutablePropTypes.contains({
            title: React.PropTypes.string.isRequired,
            summary: React.PropTypes.string
        }),
        onTitleClicked: React.PropTypes.func.isRequired
    };

    render() {
        const { article } = this.props;

        return (
            <div className={styles.root}>
                <div>
                    <div className={styles.header}>
                        <Link to={`/articles/${article.get('slug')}/`}>{article.get('title')}</Link>
                    </div>
                    <div>meta</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: article.get('summary')}} />
            </div>
        );
    }
}
