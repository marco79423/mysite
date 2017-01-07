import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {renderToString} from 'react-dom/server'
import serialize from 'serialize-javascript'

export class Html extends React.Component {
  static propTypes = {
    html: React.PropTypes.string.isRequired,
    state: ImmutablePropTypes.map
  }

  render() {
    const state = serialize(this.props.state.toJS())
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8"/>
          <title>兩大類 x 兩大類 = 四大類</title>
          <link href="/assets/styles/styles.css" rel="stylesheet"/>
          <link href="/assets/styles/vendor.css" rel="stylesheet"/>
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

export function renderHtmlPage(html, state) {
  return '<!DOCTYPE html>\n' + renderToString(<Html html={html} state={state}/>)
}
