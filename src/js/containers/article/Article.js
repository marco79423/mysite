import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import ArticleContent from '../../components/article-content';
import * as articleActions from '../../ducks/articles/actions';


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
            <ArticleContent article={ article }/>
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
