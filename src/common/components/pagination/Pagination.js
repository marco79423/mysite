import * as React from 'react'
import range from 'lodash/range'
import classNames from 'classnames'
import { Link } from 'react-router'

import styles from './Pagination.scss'

export default class Pagination extends React.Component {
  static propTypes = {
    current: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    makeLink: React.PropTypes.func.isRequired
  }

  render () {
    const {current, max, makeLink} = this.props

    return (
      <div className={styles.root}>
        <div className={styles.pagination}>
          { (current !== 1) &&
          <span className={styles.button}><Link className={styles.link} to={makeLink(current - 1)}>←</Link></span>
          }
          { range(1, max + 1).map(pageNum =>
            <span key={pageNum} className={classNames(styles.button, {[styles.current]: pageNum === current})}>
              {pageNum === current ? pageNum : <Link className={styles.link} to={makeLink(pageNum)}>{ pageNum }</Link>}
            </span>
          )}
          { (current <= max) &&
          <span className={styles.button}><Link className={styles.link} to={makeLink(current + 1)}>→</Link></span>
          }
        </div>
      </div>
    )
  }
}
