import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Base from '../../components/base';
import Header from '../../components/header';
import Nav from '../../components/nav';
import ArticleContent from '../../components/article-content';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import * as articleActions from '../../ducks/articles/actions';

import styles from './Article.scss';


export class Article extends React.Component {
    static propTypes = {
        article: ImmutablePropTypes.contains({
            slug: React.PropTypes.number,
            title: React.PropTypes.string,
            summary: React.PropTypes.string
        })
    };

    componentWillMount() {
        if(!this.props.article) {
            this.props.fetchArticles();
        }
    }

    render() {
        const { article } = this.props;
        return (
            <div className={styles.root}>
                <Base>
                    <Header/>
                    <Nav/>
                    <div className={ classNames('pure-g', styles.mainSection) }>
                        <div className='pure-u-2-3'>
                            <ArticleContent article={ article }/>
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
        article: state.get('articles').find(article => article.slug === ownProps.slug)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: () => dispatch(articleActions.fetchArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
