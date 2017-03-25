import * as React from 'react'

import styles from './ArticleContent.scss'

export default class ArticleContent extends React.Component {
  static PropTypes = {
    content: React.PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={styles.root} dangerouslySetInnerHTML={{__html: this.props.content}}/>
    )
  }
}
