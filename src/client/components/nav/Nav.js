import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {Link} from 'react-router'

import styles from './Nav.scss'


export default class Nav extends React.Component {
  static propTypes = {
    leftMenuItems: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        url: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
      })
    ),
    rightMenuItems: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        url: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
      })
    ),
    fetchArticles: React.PropTypes.func
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.leftMenu}>
          {this.props.leftMenuItems.map(item => (
            <Link key={item.get('url')} to={item.get('url')} className={styles.menuItem}>{item.get('name')}</Link>
          ))}
        </div>
        <div className={styles.rightMenu}>
          {this.props.rightMenuItems.map(item => (
            <Link key={item.get('url')} to={item.get('url')} className={styles.menuItem}>{item.get('name')}</Link>
          ))}
        </div>
      </div>
    )
  }
}
