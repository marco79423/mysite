import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import classNames from 'classnames'
import Link from '../../../../../../generic/components/Link'

import styles from './Pagination.scss'

export default class Pagination extends React.PureComponent {
  static propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    makeLink: PropTypes.func.isRequired
  }

  render () {
    const {current, max, makeLink} = this.props

    return (
      <div className={styles.pagination}>
        <ul>
          {(current !== 1) && <li><Link to={makeLink(current - 1)}>←</Link></li>}
          {
            range(1, max + 1).map(pageNum =>
              <li key={pageNum}>
                <Link className={classNames({[styles.active]: pageNum === current})} to={makeLink(pageNum)}>{ pageNum }</Link>
              </li>
            )
          }
          {(current < max) && <li><Link to={makeLink(current + 1)}>→</Link></li>}
        </ul>
      </div>
    )
  }
}
