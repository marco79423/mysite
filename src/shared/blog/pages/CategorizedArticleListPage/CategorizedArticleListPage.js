import React from 'react'

import AppLayoutContainer from '../../containers/AppLayoutContainer'
import CategorizedArticleListContainer from '../../containers/CategorizedArticleListContainer'

export default class CategorizedArticleListPage extends React.Component {
  render () {
    return (
      <AppLayoutContainer {...this.props} >
        <CategorizedArticleListContainer {...this.props}/>
      </AppLayoutContainer>
    )
  }
}
