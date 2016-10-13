import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './Content.css';


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
                {posts.map(post => <div key={post.get('id')}>{post.get('title')} - {post.get('content')}</div>)}
            </div>
        );
    }
}
