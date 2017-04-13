import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ReactDisqusThread from 'react-disqus-comments'

export default class ArticleComment extends React.PureComponent {
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
