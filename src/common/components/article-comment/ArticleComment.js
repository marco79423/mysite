import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ReactDisqusThread from 'react-disqus-comments'

export default class ArticleComment extends React.Component {
  static PropTypes = {
    config: ImmutablePropTypes.map
  }

  render () {
    return (
      <ReactDisqusThread
        shortname={this.props.config.get('shortName')}
      />
    )
  }
}
