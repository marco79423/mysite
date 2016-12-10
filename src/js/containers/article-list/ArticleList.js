import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import ArticleListItem from '../../components/article-list-item';

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

    render() {
        const { articles } = this.props;
        return (
            <div className={styles.root}>
                {
                    articles.map(article => (
                        <ArticleListItem key={article.get('slug')} article={article}/>
                    ))
                }
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
        fetchArticles: () => dispatch(articleActions.fetchArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
