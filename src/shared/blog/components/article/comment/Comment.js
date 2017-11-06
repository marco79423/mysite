import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Disqus from './Disqus'

export default class ArticleComment extends React.PureComponent {
  static PropTypes = {
    config: ImmutablePropTypes.map
  }

  render () {
    if (!this.props.config) {
      return <div/>
    }
    return (
      <Disqus shortname={this.props.config.get('shortName')}/>
    )
  }
}
