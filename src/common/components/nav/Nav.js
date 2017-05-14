import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import styles from './Nav.scss'

export default class Nav extends React.PureComponent {
  static propTypes = {
    menuItems: ImmutablePropTypes.contains({
      left: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ),
      right: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      )
    })
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.menus}>
          {this.props.menuItems.get('left').map(item => (
            <Link key={item.get('url')} to={item.get('url')} className={styles.menuItem}>{item.get('name')}</Link>
          ))}
        </div>
        <div className={styles.splitter}/>
        <div className={styles.menus}>
          {this.props.menuItems.get('right').map(item => (
            <Link key={item.get('url')} to={item.get('url')} className={styles.menuItem}>{item.get('name')}</Link>
          ))}
        </div>
      </div>
    )
  }
}
