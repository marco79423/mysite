import React from 'react'
import { Link as _Link } from 'react-router'
import PropTypes from 'prop-types'

export default class Link extends React.PureComponent {
  static PropTypes = {
    to: PropTypes.string.isRequired
  }

  render () {
    return (
      <_Link to={this.props.to}>{this.props.children}</_Link>
    )
  }
}
