import React from 'react'
import { Link as _Link } from 'react-router'
import PropTypes from 'prop-types'

export default class Link extends React.PureComponent {
  static PropTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired
  }

  render () {
    return (
      <_Link {...this.props}>{this.props.children}</_Link>
    )
  }
}
