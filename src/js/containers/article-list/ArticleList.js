import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Content from '../../components/content';

import * as articleActions from '../../ducks/articles/actions';


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
            <Content articles={ articles } toArticlePage={this.toArticlePage.bind(this)}/>
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
