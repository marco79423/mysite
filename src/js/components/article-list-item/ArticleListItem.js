import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
        const { article, onTitleClicked } = this.props;

        return (
            <div className={styles.root}>
                <div>
                    <div className={styles.header} onClick={onTitleClicked}>{article.get('title')}</div>
                    <div>meta</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: article.get('summary')}} />
            </div>
        );
    }
}
