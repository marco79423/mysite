import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import styles from './AboutMe.scss'

export default class Sidebar extends React.Component {
  static PropTypes = {
    config: ImmutablePropTypes.contains({
      socialLinks: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          name: React.PropTypes.string.isRequired,
          url: React.PropTypes.string.isRequired
        })
      ),
      quote: React.PropTypes.string
    })
  }

  render() {
    const {config} = this.props
    return (
      <div className={styles.root}>
        <div className={styles.profile}>
          <div className={styles.author}/>
          <div className={styles.info}>
            <div>
              <div>我是一隻<em>兩大類</em></div>
              <div>
                {config.get('socialLinks').map(link => (
                  <a key={link.get('name')} className={styles.link} href={link.get('url')}>{link.get('name')}</a>))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.quote}>{config.get('quote')}</div>
      </div>
    )
  }
}
