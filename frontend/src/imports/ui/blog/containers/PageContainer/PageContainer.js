import React from 'react'
import {connect} from 'react-redux'

import Page from '../../components/content/Page'

import * as pageActions from '../../ducks/page/actions'

export class PageContainer extends React.Component {

  componentDidMount() {
    if (!this.props.page) {
      this.props.fetchPages()
    }
  }

  render() {
    return (
      <Page page={this.props.page}/>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    page: state.page.items.find(page => (
      page.app === ownProps.match.params.app &&
      page.slug === ownProps.match.params.slug
    ))
  }),
  dispatch => ({
    fetchPages: () => dispatch(pageActions.fetchPages())
  })
)(PageContainer)
