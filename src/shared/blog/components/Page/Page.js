import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'

import TitleLink from '../generic/TitleLink'
import Loading from '../Loading'
import RstContent from '../RstContent'

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
  static PropTypes = {
    page: ImmutablePropTypes.contains({
      app: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.content
    })
  }

  renderHeader = () => {
    const {page} = this.props
    return (
      <Header>
        <h1><TitleLink to={`/${page.get('app')}/${page.get('slug')}/`}>{page.get('title')}</TitleLink></h1>
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
          <RstContent content={page.get('content')}/>
        </article>
      </Base>
    )
  }
}
