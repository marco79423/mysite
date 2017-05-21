import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router'

import styles from './Header.scss'

export default class Header extends React.PureComponent {
  static PropTypes = {
    siteName: PropTypes.string.isRequired,
    crazyMode: PropTypes.bool.isRequired
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.logo}/>
        <div className={styles.title}><Link className={styles.link} to='/'>{this.props.siteName}</Link></div>
        {this.props.crazyMode && <div className={classNames(styles.mode, styles.intensifies)}>瘋狂模式</div>}
      </div>
    )
  }
}
