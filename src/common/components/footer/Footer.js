import React from 'react'

import styles from './Footer.scss'

export default class Footer extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.copyright}>Copyright © 2017 - 兩大類</div>
      </div>
    )
  }
}
