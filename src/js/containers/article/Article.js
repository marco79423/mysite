import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import Link from '../../components/link';
import * as articleActions from '../../ducks/articles/actions';

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
            <div className={styles.root}>
                <div>
                    <div className={styles.header}>
                        <Link to={`/articles/${article.get('slug')}/`}>{article.get('title')}</Link>
                    </div>
                    <div>meta</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: article.get('content')}} />
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
