import React from 'react'
import PropTypes from 'prop-types'

import styles from './RstContent.scss'

export default class RstContent extends React.PureComponent {
  static PropTypes = {
    content: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={styles.content} dangerouslySetInnerHTML={{__html: this.props.content}}/>
    )
  }
}
