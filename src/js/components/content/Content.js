import * as React from 'react';

import styles from './Content.css';


export default class Content extends React.Component {
    render() {
        const {posts} = this.props;
        return (
            <div className={styles.root}>
                {posts.map(post => <div key={post.get('id')}>{post.get('title')} - {post.get('content')}</div>)}
            </div>
        )
    }
}
