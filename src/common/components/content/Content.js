import React from 'react'
import styles from './Content.scss'

export default class Content extends React.PureComponent {
  render () {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    )
  }
}
