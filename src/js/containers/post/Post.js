import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Base from '../../components/base';
import Header from '../../components/header';
import Nav from '../../components/nav';
import PostContent from '../../components/post-content';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import * as postActions from '../../ducks/posts/actions';

import styles from './Post.scss';


export class Post extends React.Component {
    static propTypes = {
        post: ImmutablePropTypes.contains({
            slug: React.PropTypes.number,
            title: React.PropTypes.string,
            summary: React.PropTypes.string
        })
    };

    componentWillMount() {
        if(!this.props.post) {
            this.props.fetchPosts();
        }
    }

    render() {
        const { post } = this.props;
        return (
            <div className={styles.root}>
                <Base>
                    <Header/>
                    <Nav/>
                    <div className={ classNames('pure-g', styles.mainSection) }>
                        <div className='pure-u-2-3'>
                            <PostContent post={ post }/>
                        </div>
                        <div className='pure-u-1-3'>
                            <Sidebar/>
                        </div>
                    </div>
                    <Footer/>
                </Base>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.get('posts').find(post => post.slug === ownProps.slug)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postActions.fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
