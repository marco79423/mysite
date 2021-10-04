import React from 'react'
import {Helmet} from 'react-helmet'

export default class SiteHead extends React.PureComponent {

  render() {
    if (!this.props.config) {
      return <div/>
    }
    return (
      <Helmet>
        <title>{this.props.config.title}</title>
        {this.props.config.meta.map(meta =>
          <meta key={meta.name} name={meta.name} content={meta.content}/>)}
        {this.props.config.link.map(link =>
          <link key={link.rel} rel={link.rel} href={link.href}/>)}
      </Helmet>
    )
  }
}
