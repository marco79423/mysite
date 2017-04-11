import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SiteInfo from '../../components/site-info'

import * as configSelectors from '../../ducks/config/selectors'

export class SiteInfoContainer extends React.Component {
  static PropTypes = {
    version: PropTypes.string.isRequired,
    updatedTime: PropTypes.string.isRequired
  }

  render () {
    return (
      <SiteInfo
        version={this.props.version}
        updatedTime={this.props.updatedTime}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    version: configSelectors.getSiteVersion(state),
    updatedTime: configSelectors.getSiteUpdatedTime(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteInfoContainer)
