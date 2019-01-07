import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Lab from '../../components/content/Lab'
import * as LabActions from '../../ducks/lab/actions'

export class LabContainer extends React.Component {
  static PropTypes = {
    crazyMode: PropTypes.bool.isRequired,
    setCrazyMode: PropTypes.func.isRequired
  }

  render() {
    const props = this.props
    return (
      <Lab {...props}/>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    crazyMode: state.lab.crazyMode
  }),
  dispatch => ({
    setCrazyMode: crazyMode => dispatch(LabActions.setCrazyMode(crazyMode))
  })
)(LabContainer)
