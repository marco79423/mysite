import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {Link} from 'react-router'

import styles from './Nav.scss'

export default class Nav extends React.Component {
  static propTypes = {
    leftMenuItems: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    rightMenuItems: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    fetchArticles: PropTypes.func
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.menus}>
          {this.props.leftMenuItems.map(item => (
            <Link key={item.get('url')} to={item.get('url')} className={styles.menuItem}>{item.get('name')}</Link>
          ))}
        </div>
        <div className={styles.splitter} />
        <div className={styles.menus}>
          {this.props.rightMenuItems.map(item => (
            <Link key={item.get('url')} to={item.get('url')} className={styles.menuItem}>{item.get('name')}</Link>
          ))}
        </div>
      </div>
    )
  }
}
