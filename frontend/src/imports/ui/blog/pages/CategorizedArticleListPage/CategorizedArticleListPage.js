import React from 'react'

import AppLayoutContainer from '../../containers/AppLayoutContainer'
import ArticleListContainer from '../../containers/ArticleListContainer'

export default class CategorizedArticleListPage extends React.Component {
  render () {
    return (
      <AppLayoutContainer {...this.props} >
        <ArticleListContainer {...this.props}/>
      </AppLayoutContainer>
    )
  }
}
