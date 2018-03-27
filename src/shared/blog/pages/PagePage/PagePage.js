import React from 'react'

import AppLayoutContainer from '../../containers/AppLayoutContainer'
import PageContainer from '../../containers/PageContainer'

export default class PagePage extends React.Component {
  render () {
    return (
      <AppLayoutContainer {...this.props} >
        <PageContainer {...this.props}/>
      </AppLayoutContainer>
    )
  }
}
