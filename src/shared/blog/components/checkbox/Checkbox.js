import React from 'react'
import PropTypes from 'prop-types'

import styles from './Checkbox.scss'

export default class Checkbox extends React.PureComponent {
  static PropTypes = {
    checked: PropTypes.bool.isRequired,
    setChecked: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.props.setChecked(e.target.checked)
  }

  render () {
    return (
      <label className={styles.root}>
        <input type="checkbox" checked={this.props.checked} onChange={this.onChange}/>
        <div className={styles.box}/>
      </label>
    )
  }
}
