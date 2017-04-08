import * as React from 'react'
import { connect } from 'react-redux'

import * as configSelectors from '../../ducks/config/selectors'

import styles from './SiteInfoContainer.scss'

export class SiteInfo extends React.Component {
  static PropTypes = {
    version: React.PropTypes.string.isRequired,
    updatedTime: React.PropTypes.string.isRequired
  }

  render () {
    return (
      <article className={styles.root}>
        <div>
          <header className={styles.header}>網站資訊</header>
          <table className={styles.table}>
            <tbody>
            <tr>
              <td>網站更新時間：</td>
              <td>{this.props.updatedTime}</td>
            </tr>
            <tr>
              <td>版本：</td>
              <td>{this.props.version}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </article>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    version: configSelectors.getSiteVersion(state),
    updatedTime: configSelectors.getSiteUpdatedTime(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteInfo)
