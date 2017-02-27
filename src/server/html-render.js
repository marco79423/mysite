import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {renderToString} from 'react-dom/server'
import serialize from 'serialize-javascript'


export class Html extends React.Component {
  static propTypes = {
    html: React.PropTypes.string.isRequired,
    state: ImmutablePropTypes.map.isRequired,
    head: React.PropTypes.any.isRequired
  }

  render() {
    const state = serialize(this.props.state.toJS())
    const attrs = this.props.head.htmlAttributes.toComponent();
    const trackCode = `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";analytics.load("OlWbVbwmrPGXrKj6JgQp7EpCQz27EXlb");}}();`  // eslint-disable-line

    return (
      <html {...attrs}>
      <head>
        <meta charSet="UTF-8"/>
        <link href="/assets/styles/vendor.css" rel="stylesheet"/>
        <link href="/assets/styles/styles.css" rel="stylesheet"/>
        <script dangerouslySetInnerHTML={{__html: trackCode }} />
        {this.props.head.title.toComponent()}
        {this.props.head.meta.toComponent()}
        {this.props.head.link.toComponent()}
      </head>
      <body>
      <div id="app" dangerouslySetInnerHTML={{__html: this.props.html}} />
      <script dangerouslySetInnerHTML={{__html: `window.__PRELOADED_STATE__=${state}`}} charSet="UTF-8"/>
      <script type="text/javascript" src="/assets/bundle.js"/>
      </body>
      </html>
    )
  }
}

export function renderHtmlPage(html, head, state) {
  return '<!DOCTYPE html>\n' + renderToString(<Html html={html} head={head} state={state}/>)
}
