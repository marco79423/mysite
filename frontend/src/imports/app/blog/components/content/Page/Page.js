import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TitleLink from '../../generic/TitleLink'
import Loading from '../../generic/Loading'
import RstContent from '../../generic/RstContent'

const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }

  article {
    padding: 2em;
    border-bottom: 1px solid #eee;
    background: white;

    header {
      
    }
  }
`

const Header = styled.header`
  h1 {
    margin: 3px 0 24px;
  }
`

export default class Page extends React.PureComponent {

  renderHeader = () => {
    const {page} = this.props
    return (
      <Header>
        <h1><TitleLink to={`/${page.app}/${page.slug}/`}>{page.title}</TitleLink></h1>
      </Header>
    )
  }

  render () {
    const {page} = this.props
    if (!page) {
      return (
        <Base>
          <Loading/>
        </Base>
      )
    }

    return (
      <Base>
        <article>
          {this.renderHeader()}
          <RstContent content={page.content}/>
        </article>
      </Base>
    )
  }
}
