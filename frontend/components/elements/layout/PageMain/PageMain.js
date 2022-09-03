import React from 'react'
import styled from '@emotion/styled'

import PageAside from './PageAside'

const Base = styled.main`
  background: ${props => props.theme.page.main.background};
  overflow: auto;
`

export default class PageMain extends React.Component {

  render() {
    return (
      <Base>
        {this.props.content}
        <PageAside
          relatedSites={this.props.relatedSites}
          recentArticles={this.props.recentArticles}/>
      </Base>
    )
  }
}
