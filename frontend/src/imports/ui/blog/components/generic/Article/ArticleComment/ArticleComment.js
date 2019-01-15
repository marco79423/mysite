import React from 'react'

import Disqus from './Disqus'

export default class ArticleComment extends React.PureComponent {

  render() {
    if (!this.props.config) {
      return <div/>
    }
    return (
      <Disqus shortname={this.props.config.shortName}/>
    )
  }
}
