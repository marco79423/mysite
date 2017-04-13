import React from 'react'
import PropTypes from 'prop-types'

import styles from './ArticleContent.scss'

export default class ArticleContent extends React.PureComponent {
  static PropTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={styles.root} dangerouslySetInnerHTML={{__html: this.props.content}}/>
    )
  }
}
