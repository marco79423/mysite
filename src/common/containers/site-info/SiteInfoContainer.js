import * as React from 'react'
import { connect } from 'react-redux'

import SiteInfo from '../../components/site-info'

import * as configSelectors from '../../ducks/config/selectors'

export class SiteInfoContainer extends React.Component {
  static PropTypes = {
    version: React.PropTypes.string.isRequired,
    updatedTime: React.PropTypes.string.isRequired
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
