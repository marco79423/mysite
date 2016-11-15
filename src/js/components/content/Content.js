import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './Content.scss';

import PostListItem from '../post-list-item';


export default class Content extends React.Component {
    static PropTypes = {
        posts: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: React.PropTypes.number.isRequired,
                title: React.PropTypes.string.isRequired,
                content: React.PropTypes.string
            })
        )
    };

    render() {
        const { posts } = this.props;
        return (
            <div className={styles.root}>
                {posts.map(post => <PostListItem key={post.get('id')} post={post}/>)}
            </div>
        );
    }
}
