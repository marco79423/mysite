import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SiteInfo from './components/site-info'

import * as configSelectors from '../../ducks/config/selectors'
import * as siteInfoSelectors from './selectors'

import * as actions from './actions'

@connect(
  (state, ownProps) => ({
    frontendVersion: configSelectors.getSiteVersion(state),
    backendVersion: siteInfoSelectors.getBackendVersion(state),
    updatedTime: configSelectors.getSiteUpdatedTime(state)
  }),
  dispatch => ({
    fetchSiteInfo: () => dispatch(actions.fetchSiteInfo())
  })
)
export default class SiteInfoContainer extends React.Component {
  static PropTypes = {
    frontendVersion: PropTypes.string.isRequired,
    backendVersion: PropTypes.string.isRequired,
    updatedTime: PropTypes.string.isRequired
  }

  componentWillMount () {
    if (!this.props.backendVersion) {
      this.props.fetchSiteInfo()
    }
  }
  render () {
    return (
      <SiteInfo
        frontendVersion={this.props.frontendVersion}
        backendVersion={this.props.backendVersion}
        updatedTime={this.props.updatedTime}
      />
    )
  }
}
