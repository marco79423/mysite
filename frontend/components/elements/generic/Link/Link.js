import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

export default class Link extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    href: PropTypes.string
  }

  render() {
    const {href, className} = this.props
    return (
      <NextLink href={href}>
        <a className={className}>{this.props.children}</a>
      </NextLink>
    )
  }
}
