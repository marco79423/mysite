import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './PostListItem.scss';

export default class PostListItem extends React.Component {
    static PropTypes = {
        post: ImmutablePropTypes.contains({
            title: React.PropTypes.string.isRequired,
            content: React.PropTypes.string
        }),
        onTitleClicked: React.PropTypes.func.isRequired
    };

    renderSummary(content) {
        return content;
    }

    render() {
        const { post, onTitleClicked } = this.props;

        return (
            <div className={styles.root}>
                <div>
                    <div onClick={onTitleClicked}>{post.get('title')}</div>
                    <div>meta</div>
                </div>
                {this.renderSummary(post.get('content'))}
            </div>
        );
    }
}
