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

    return (
      <html {...attrs}>
      <head>
        <meta charSet="UTF-8"/>
        <link href="/assets/styles/vendor.css" rel="stylesheet"/>
        <link href="/assets/styles/styles.css" rel="stylesheet"/>
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
