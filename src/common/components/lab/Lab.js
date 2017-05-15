import React from 'react'
import { Link } from 'react-router'

import styles from './Lab.scss'

export default class Lab extends React.PureComponent {
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
          </tbody>
        </table>
      </div>
    )
  }
}
