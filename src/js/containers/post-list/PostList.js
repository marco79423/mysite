import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Base from '../../components/base';
import Header from '../../components/header';
import Nav from '../../components/nav';
import Content from '../../components/content';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import * as postActions from '../../ducks/posts/actions';

import styles from './PostList.css';


export class PostList extends React.Component {
    static propTypes = {
        posts: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: React.PropTypes.number,
                title: React.PropTypes.string,
                content: React.PropTypes.string
            })
        ),
        fetchPosts: React.PropTypes.func
    };

    componentWillMount() {
        this.props.fetchPosts();
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
                            <Content posts={ posts }/>
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
        fetchPosts: () => dispatch(postActions.fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
