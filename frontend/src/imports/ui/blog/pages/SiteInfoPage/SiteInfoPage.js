import React from 'react'

import AppLayoutContainer from '../../containers/AppLayoutContainer'
import SiteInfoContainer from '../../containers/SiteInfoContainer'

export default class SiteInfoPage extends React.Component {
  render () {
    return (
      <AppLayoutContainer {...this.props} >
        <SiteInfoContainer {...this.props}/>
      </AppLayoutContainer>
    )
  }
}
