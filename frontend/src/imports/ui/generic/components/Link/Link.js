import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Link extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired
  }

  render() {
    const Component = this.props.to ? RouterLink : 'a'
    return (
      <Component {...this.props}>
        {this.props.children}
      </Component>
    )
  }
}
