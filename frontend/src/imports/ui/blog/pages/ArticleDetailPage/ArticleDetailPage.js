import React from 'react'

import AppLayoutContainer from '../../containers/AppLayoutContainer'
import ArticleDetailContainer from '../../containers/ArticleDetailContainer'

export default class ArticleDetailPage extends React.Component {
  render () {
    return (
      <AppLayoutContainer {...this.props} >
        <ArticleDetailContainer {...this.props}/>
      </AppLayoutContainer>
    )
  }
}

