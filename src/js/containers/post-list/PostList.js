import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux'

import Base from '../../components/base';
import Header from '../../components/header';
import Nav from '../../components/nav';
import Content from '../../components/content';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import * as postActions from '../../ducks/posts/actions';

import styles from './PostList.scss';


export class PostList extends React.Component {
    static propTypes = {
        posts: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                slug: React.PropTypes.string,
                title: React.PropTypes.string,
                summary: React.PropTypes.string
            })
        ),
        fetchPosts: React.PropTypes.func
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    componentWillMount() {
        this.props.fetchPosts();
    }

    toPostPage(slug) {
        this.props.push(`/posts/${slug}/`);
        // this.context.router.push(`/posts/${slug}/`);
    }

    render() {
        const { posts } = this.props;
        return (
            <div className={styles.root}>
                <Base>
                    <Header/>
                    <Nav/>
                    <div className={ classNames('pure-g', styles.mainSection) }>
                        <div className='pure-u-2-3'>
                            <Content posts={ posts } toPostPage={this.toPostPage.bind(this)}/>
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

const mapStateToProps = (state) => {
    return {
        posts: state.get('posts')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postActions.fetchPosts()),
        push: (path) => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
