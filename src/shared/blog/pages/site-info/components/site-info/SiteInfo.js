import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../../../../generic/components/Link'

import styles from './SiteInfo.scss'

export default class SiteInfo extends React.PureComponent {
  static PropTypes = {
    frontendVersion: PropTypes.string.isRequired,
    backendVersion: PropTypes.string.isRequired,
    updatedTime: PropTypes.string.isRequired
  }

  render () {
    return (
      <section className={styles.siteInfo}>
        <article>
          <header>
            <h1><Link to='/info/'>網站資訊</Link></h1>
          </header>
          <table>
            <tbody>
            <tr>
              <td>網站更新時間：</td>
              <td>{this.props.updatedTime}</td>
            </tr>
            <tr>
              <td>前端版本：</td>
              <td>{this.props.frontendVersion}</td>
            </tr>
            <tr>
              <td>後端版本：</td>
              <td>{this.props.backendVersion}</td>
            </tr>
            </tbody>
          </table>
        </article>
      </section>
    )
  }
}