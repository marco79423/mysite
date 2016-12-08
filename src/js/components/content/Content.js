import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './Content.scss';

import PostListItem from '../post-list-item';


export default class Content extends React.Component {
    static PropTypes = {
        posts: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                slug: React.PropTypes.number.isRequired,
                title: React.PropTypes.string.isRequired,
                summary: React.PropTypes.string
            })
        ),
        toPostPage: React.PropTypes.func.isRequired
    };

    render() {
        const { posts, toPostPage } = this.props;
        return (
            <div className={styles.root}>
                {
                    posts.map(post => (
                        <PostListItem
                            key={post.get('slug')}
                            onTitleClicked={() => toPostPage(post.get('slug'))}
                            post={post}
                        />
                    ))
                }
            </div>
        );
    }
}
