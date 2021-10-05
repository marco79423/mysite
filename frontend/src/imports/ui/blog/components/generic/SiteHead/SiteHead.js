import React from 'react'
import Head from 'next/head'

export default class SiteHead extends React.PureComponent {

  render() {
    if (!this.props.config) {
      return null
    }
    return (
      <Head>
        <title>{this.props.config.title}</title>
        {this.props.config.meta.map(meta =>
          <meta key={meta.name} name={meta.name} content={meta.content}/>)}
        {this.props.config.link.map(link =>
          <link key={link.rel} rel={link.rel} href={link.href}/>)}
      </Head>
    )
  }
}
