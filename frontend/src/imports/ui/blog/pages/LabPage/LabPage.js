import React from 'react'

import AppLayoutContainer from '../../containers/AppLayoutContainer'
import LabContainer from '../../containers/LabContainer'

export default class LabPage extends React.Component {
  render () {
    return (
      <AppLayoutContainer {...this.props} >
        <LabContainer {...this.props}/>
      </AppLayoutContainer>
    )
  }
}
