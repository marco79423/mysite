import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './PostContent.scss';


export default class PostContent extends React.Component {
    static PropTypes = {
        post: ImmutablePropTypes.contains({
            slug: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            content: React.PropTypes.content
        })
    };

    render() {
        const { post } = this.props;
        return (
            <div className={styles.root}>
                <div>
                    <div className={styles.header}>{post.get('title')}</div>
                    <div>meta</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.get('content')}} />
            </div>
        );
    }
}
