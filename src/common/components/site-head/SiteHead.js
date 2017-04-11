import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class SiteHead extends React.Component {
  static PropTypes = {
    config: ImmutablePropTypes.contains({
      title: PropTypes.string.isRequired,
      meta: ImmutablePropTypes.listOf({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }),
      link: ImmutablePropTypes.listOf({
        ref: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired
      })
    }).isRequired
  }

  render () {
    return (
      <Helmet>
        <title>{this.props.config.get('title')}</title>
        {this.props.config.get('meta').map(meta =>
          <meta key={meta.get('name')} name={meta.get('name')} content={meta.get('content')}/>)}
        {this.props.config.get('link').map(link =>
          <link key={link.get('rel')} rel={link.get('rel')} href={link.get('href')}/>)}
      </Helmet>
    )
  }
}
