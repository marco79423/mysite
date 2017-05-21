import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import Checkbox from '../checkbox'

import styles from './Lab.scss'

export default class Lab extends React.PureComponent {
  static PropTypes = {
    crazyMode: PropTypes.bool.isRequired,
    setCrazyMode: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className={styles.root}>
        <header className={styles.header}>兩大類網站實驗室</header>
        <table className={styles.table}>
          <tbody>
          <tr>
            <td>網站資訊頁面</td>
            <td>
              <Link className={styles.link} to={`/info/`}>連結</Link>
            </td>
          </tr>
          <tr>
            <td>瘋狂模式</td>
            <td>
              <Checkbox checked={this.props.crazyMode} setChecked={this.props.setCrazyMode}/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
