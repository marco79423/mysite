import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import Link from '../../components/link';
import ArticleMeta from '../../components/article-meta';
import * as articleActions from '../../ducks/article/actions';

import styles from './Article.scss';


export class Article extends React.Component {
    static PropTypes = {
        article: ImmutablePropTypes.contains({
            slug: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            content: React.PropTypes.content
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
            <article className={styles.root}>
                <div>
                    <header className={styles.header}>
                        <Link to={`/articles/${article.get('slug')}/`}>{article.get('title')}</Link>
                    </header>
                    <ArticleMeta
                        categories={article.get('categories')}
                        date={article.get('date')}
                        modifiedDate={article.get('modified_date')}
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: article.get('content')}} />
            </article>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        article: state.getIn(['article', 'items']).find(article => article.slug === ownProps.slug)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: () => dispatch(articleActions.fetchArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
