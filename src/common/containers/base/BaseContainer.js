import React from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Base from '../../components/base'

import * as siteSelectors from '../../ducks/site/selectors'
import * as configSelectors from '../../ducks/config/selectors'

@connect(
  (state, props) => ({
    siteConfig: siteSelectors.getSiteHeadConfig(state, props),
    siteName: configSelectors.getSiteName(state, props),
    menuItems: configSelectors.getMenuItems(state, props),
    category: props.params.category,
  })
)
export default class BaseContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    siteName: React.PropTypes.string.isRequired,
    menuItems: ImmutablePropTypes.map.isRequired,
    category: React.PropTypes.string
  }

  render () {
    const {siteConfig, siteName, menuItems, category} = this.props
    return (
      <Base siteConfig={siteConfig} siteName={siteName} menuItems={menuItems} category={category}>
        {this.props.children}
      </Base>
    )
  }
}
