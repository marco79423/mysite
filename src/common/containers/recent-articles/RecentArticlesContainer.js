import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import RecentArticles from '../../components/recent-articles'

import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'

@connect(
  (state, props) => ({
    articles: articleSelectors.getRecentArticles(state, props)
  }),
  dispatch => ({
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  })
)
export default class RecentArticlesContainer extends React.Component {
  static PropTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string
      })
    )
  }

  componentWillMount () {
    if (!this.props.article) {
      this.props.fetchArticles()
    }
  }

  render () {
    return (
      <RecentArticles articles={this.props.articles}/>
    )
  }
}
