import React from 'react'
import { connect } from 'react-redux'

import Lab from '../../components/lab'

@connect(
  (state, ownProps) => ({}),
  dispatch => ({})
)
export default class LabContainer extends React.Component {

  render () {
    return (
      <Lab/>
    )
  }
}
