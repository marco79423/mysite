import React from 'react'
import classNames from 'classnames'

import styles from './Loading.scss'

export default class Loading extends React.PureComponent {
  render () {
    return (
      <div className={styles.root}>
        <div className={classNames(styles.loadingImage, styles.twister)}/>
        <div className={styles.message}>正在努力讀取中…</div>
      </div>
    )
  }
}
