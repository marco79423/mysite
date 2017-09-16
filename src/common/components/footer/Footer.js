import React from 'react'
import PropTypes from 'prop-types'

import styles from './Footer.scss'

export default class Footer extends React.PureComponent {
  static PropTypes = {
    copyright: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.copyright}>{this.props.copyright}</div>
      </div>
    )
  }
}
