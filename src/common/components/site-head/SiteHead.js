import * as React from 'react'
import Helmet from 'react-helmet'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class SiteHead extends React.Component {
  static PropTypes = {
    config: ImmutablePropTypes.contains({
      title: React.PropTypes.string.isRequired,
      meta: ImmutablePropTypes.listOf({
        name: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired
      }),
      link: ImmutablePropTypes.listOf({
        ref: React.PropTypes.string.isRequired,
        href: React.PropTypes.string.isRequired
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
