import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Base from '../../components/base';
import Header from '../../components/header';
import Nav from '../../components/nav';
import Content from '../../components/content';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import styles from './ArticleList.css';


export class ArticleList extends React.Component {
    render() {
        const {posts} = this.props;
        return (
            <div className={styles.root}>
                <Base>
                    <Header/>
                    <Nav/>
                    <div className={classNames('pure-g', styles.mainSection)}>
                        <div className='pure-u-2-3'>
                            <Content posts={posts}/>
                        </div>
                        <div className='pure-u-1-3'>
                            <Sidebar/>
                        </div>
                    </div>
                    <Footer/>
                </Base>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.getIn(['posts', 'posts'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
