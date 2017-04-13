import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import styles from './AboutMe.scss'

export default class AboutMe extends React.PureComponent {
  static PropTypes = {
    config: ImmutablePropTypes.contains({
      socialLinks: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ),
      quote: PropTypes.string
    })
  }

  render () {
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
