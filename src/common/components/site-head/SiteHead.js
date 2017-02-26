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
    })
  }

  render() {
    return (
      <Helmet
        title={this.props.config.get('title')}
        meta={this.props.config.get('meta').toJS()}
        link={this.props.config.get('link').toJS()}
      />
    )
  }
}
