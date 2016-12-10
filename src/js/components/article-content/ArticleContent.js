import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './ArticleContent.scss';


export default class ArticleContent extends React.Component {
    static PropTypes = {
        article: ImmutablePropTypes.contains({
            slug: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            content: React.PropTypes.content
        })
    };

    render() {
        const { article } = this.props;
        return (
            <div className={styles.root}>
                <div>
                    <div className={styles.header}>{article.get('title')}</div>
                    <div>meta</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: article.get('content')}} />
            </div>
        );
    }
}
