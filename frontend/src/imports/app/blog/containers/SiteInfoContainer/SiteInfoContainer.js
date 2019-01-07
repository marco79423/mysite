import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import SiteInfo from '../../components/content/SiteInfo'
import * as siteInfoSelectors from '../../ducks/site-info/selectors'

import * as actions from '../../ducks/site-info/actions'

export class SiteInfoContainer extends React.Component {
  static PropTypes = {
    repositoryVersion: PropTypes.string.isRequired,
    updatedTime: PropTypes.string.isRequired
  }

  componentWillMount() {
    if (!this.props.backendVersion) {
      this.props.fetchSiteInfo()
    }
  }

  render() {
    return (
      <SiteInfo
        repositoryVersion={this.props.repositoryVersion}
        updatedTime={this.props.updatedTime}
      />
    )
  }
}

export default connect(
  (state, ownProps) => ({
    repositoryVersion: siteInfoSelectors.getRepositoryVersion(state),
    updatedTime: siteInfoSelectors.getSiteUpdatedTime(state)
  }),
  dispatch => ({
    fetchSiteInfo: () => dispatch(actions.fetchSiteInfo())
  })
)(SiteInfoContainer)
