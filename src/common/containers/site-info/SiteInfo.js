import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {connect} from 'react-redux'

import SiteHead from '../../components/site-head'
import * as siteSelectors from '../../ducks/site/selectors'
import * as configSelectors from '../../ducks/config/selectors'

import styles from './SiteInfo.scss'


export class SiteInfo extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    version: React.PropTypes.string.isRequired,
    updatedTime: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <article className={styles.root}>
        <SiteHead config={this.props.siteConfig}/>
        <div>
          <header className={styles.header}>網站資訊</header>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>網站更新時間：</td><td>{this.props.updatedTime}</td>
              </tr>
              <tr>
                <td>版本：</td><td>{this.props.version}</td>
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
    siteConfig: siteSelectors.getSiteHeadConfig(state, ownProps),
    version: configSelectors.getSiteVersion(state),
    updatedTime: configSelectors.getSiteUpdatedTime(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteInfo)
