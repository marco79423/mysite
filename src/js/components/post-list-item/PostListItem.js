import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './PostListItem.scss';

export default class PostListItem extends React.Component {
    static PropTypes = {
        post: ImmutablePropTypes.contains({
            title: React.PropTypes.string.isRequired,
            summary: React.PropTypes.string
        }),
        onTitleClicked: React.PropTypes.func.isRequired
    };

    render() {
        const { post, onTitleClicked } = this.props;

        return (
            <div className={styles.root}>
                <div>
                    <div className={styles.header} onClick={onTitleClicked}>{post.get('title')}</div>
                    <div>meta</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.get('summary')}} />
            </div>
        );
    }
}
