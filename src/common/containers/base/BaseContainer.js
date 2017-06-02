import React from 'react'
import PropTypes from 'prop-types'
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
    crazyMode: state.getIn(['lab', 'crazyMode']),
    category: props.params.category,
  })
)
export default class BaseContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    siteName: PropTypes.string.isRequired,
    menuItems: ImmutablePropTypes.map.isRequired,
    category: PropTypes.string
  }

  render () {
    const props = this.props
    return (
      <Base {...props}>
        {this.props.children}
      </Base>
    )
  }
}
