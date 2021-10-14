import React from 'react'
import {connect} from 'react-redux'

import Archives from '../../imports/ui/blog/components/content/Archives'

import * as articleActions from '../../../redux/article/actions'
import * as articleSelectors from '../../../redux/article/selectors'

export class ArchivesContainer extends React.Component {

  componentDidMount () {
    if (this.props.articles.length === 0) {
      this.props.fetchArticles()
    }
  }

  render() {
    const {articles} = this.props
    return (
      <Archives articles={articles}/>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    articles: articleSelectors.getArticles(state, ownProps)
  }),
  dispatch => ({
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  })
)(ArchivesContainer)
