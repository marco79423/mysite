import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';

import Base from '../../components/base';
import Header from '../../components/header';
import Nav from '../../components/nav';
import Content from '../../components/content';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import * as articleActions from '../../ducks/articles/actions';

import styles from './ArticleList.scss';


export class ArticleList extends React.Component {
    static propTypes = {
        articles: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                slug: React.PropTypes.string,
                title: React.PropTypes.string,
                summary: React.PropTypes.string
            })
        ),
        fetchArticles: React.PropTypes.func
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    componentWillMount() {
        this.props.fetchArticles();
    }

    toArticlePage(slug) {
        this.props.push(`/articles/${slug}/`);
        // this.context.router.push(`/articles/${slug}/`);
    }

    render() {
        const { articles } = this.props;
        return (
            <div className={styles.root}>
                <Base>
                    <Header/>
                    <Nav/>
                    <div className={ classNames('pure-g', styles.mainSection) }>
                        <div className='pure-u-2-3'>
                            <Content articles={ articles } toArticlePage={this.toArticlePage.bind(this)}/>
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
        articles: state.get('articles')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: () => dispatch(articleActions.fetchArticles()),
        push: (path) => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
