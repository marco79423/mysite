import * as React from 'react'
import ReactDisqusThread from 'react-disqus-thread'


export default class ArticleComment extends React.Component {
  static PropTypes = {
    config: React.PropTypes.any
  }

  render() {
    return (
      <ReactDisqusThread
        shortname={this.props.config.shortname}
        identifier={this.props.config.identifier}
      />
    )
  }
}
