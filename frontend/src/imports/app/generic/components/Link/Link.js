import React from 'react'
import {Link as RouterLink} from 'react-router'
import PropTypes from 'prop-types'

export default class Link extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired
  }

  render () {
    return (
      <RouterLink {...this.props}>{this.props.children}</RouterLink>
    )
  }
}
