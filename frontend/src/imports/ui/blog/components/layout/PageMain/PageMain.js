import React from 'react'
import styled from 'styled-components'

import PageAside from './PageAside'

const Base = styled.header`
  background: ${props => props.theme.page.main.background};
  overflow: auto;
`

export default class PageMain extends React.Component {

  render() {
    return (
      <Base>
        {this.props.content}
        <PageAside recentArticles={this.props.recentArticles}/>
      </Base>
    )
  }
}
