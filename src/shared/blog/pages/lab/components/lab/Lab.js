import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../../../../generic/components/Link'

import Checkbox from '../../../../components/checkbox'

import styles from './Lab.scss'

export default class Lab extends React.PureComponent {
  static PropTypes = {
    crazyMode: PropTypes.bool.isRequired,
    setCrazyMode: PropTypes.func.isRequired
  }

  render () {
    return (
      <section className={styles.lab}>
        <article>
          <header>
            <h1><Link to='/lab/'>兩大類實驗室</Link></h1>
          </header>

          <table>
            <tbody>
            <tr>
              <td>網站資訊頁面</td>
              <td>
                <Link to={`/info/`}>連結</Link>
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
        </article>
      </section>
    )
  }
}
