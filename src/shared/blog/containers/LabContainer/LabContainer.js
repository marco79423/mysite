import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Lab from '../../components/Lab'
import * as LabActions from '../../ducks/lab/actions'

@connect(
  (state, ownProps) => ({
    crazyMode: state.getIn(['scenes', 'lab', 'crazyMode'])
  }),
  dispatch => ({
    setCrazyMode: crazyMode => dispatch(LabActions.setCrazyMode(crazyMode))
  })
)
export default class LabContainer extends React.Component {
  static PropTypes = {
    crazyMode: PropTypes.bool.isRequired,
    setCrazyMode: PropTypes.func.isRequired
  }
  render () {
    const props = this.props
    return (
      <Lab {...props}/>
    )
  }
}
