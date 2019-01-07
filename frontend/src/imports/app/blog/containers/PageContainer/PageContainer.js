import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Page from '../../components/content/Page'

import * as pageActions from '../../ducks/page/actions'

@connect(
  (state, ownProps) => ( {
    page: state.page.items.find(page => (
      page.app === ownProps.params.app &&
      page.slug === ownProps.params.slug
    ))
  }),
  dispatch => ({
    fetchPages: () => dispatch(pageActions.fetchPages())
  })
)
export default class PageContainer extends React.Component {

  componentWillMount () {
    if (!this.props.page) {
      this.props.fetchPages()
    }
  }

  render () {
    return (
      <Page page={this.props.page}/>
    )
  }
}
