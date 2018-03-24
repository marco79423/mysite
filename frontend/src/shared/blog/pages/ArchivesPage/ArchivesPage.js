import React from 'react'

import AppLayoutContainer from '../../containers/AppLayoutContainer'
import ArchivesContainer from '../../containers/ArchivesContainer'

export default class ArchivesPage extends React.Component {
  render () {
    return (
      <AppLayoutContainer {...this.props} >
        <ArchivesContainer {...this.props} />
      </AppLayoutContainer>
    )
  }
}
