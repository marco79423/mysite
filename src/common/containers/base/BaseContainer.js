import React from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Base from '../../components/base'

import * as siteSelectors from '../../ducks/site/selectors'

@connect(
  (state, props) => ({
    config: state.get('config'),
    siteConfig: siteSelectors.getSiteHeadConfig(state, props)
  })
)
export default class BaseContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    config: ImmutablePropTypes.map.isRequired
  }

  render () {
    const {config, siteConfig} = this.props
    return (
      <Base
        siteConfig={siteConfig}
        config={config}>
        {this.props.children}
      </Base>
    )
  }
}
