import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import Archives from '../../components/archives'

import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'

export class ArchivesContainer extends React.Component {
  static PropTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.any.isRequired
      })
    ),
    fetchArticles: PropTypes.func
  }

  componentWillMount () {
    if (this.props.articles.isEmpty()) {
      this.props.fetchArticles()
    }
  }

  render () {
    const {articles} = this.props
    return (
      <Archives articles={articles}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles: articleSelectors.getArticles(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchivesContainer)
