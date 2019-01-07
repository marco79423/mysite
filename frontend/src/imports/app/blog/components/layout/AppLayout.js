import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import {normalize} from 'polished'

import PageHeader from './PageHeader'
import PageNav from './PageNav'
import PageMain from './PageMain'
import PageFooter from './PageFooter'


injectGlobal`
  ${normalize()}
  
  html {
    font-size: 16px;
    font-family: Arial, Microsoft JhengHei, Open Sans, sans-serif;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`

const Base = styled.div`
  width: 100%;
  height: 100%;
  
  color: ${props => props.theme.global.fontColor};
  background: ${props => props.theme.page.background};
`

const Container = styled.div`
  position: relative;

  width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    width: 100%;
  }
  
  
`

export default class AppLayout extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    siteName: PropTypes.string.isRequired,
    menuItems: ImmutablePropTypes.contains({
      main: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ),
      extra: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      )
    }).isRequired,
    theme: PropTypes.object.isRequired,
    recentArticles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string
      })
    ),
    crazyMode: PropTypes.bool.isRequired,
    copyright: PropTypes.string
  }

  render () {
    return (
      <ThemeProvider theme={this.props.theme.toJS()}>
        <Base>
          <Container>
            <PageHeader siteName={this.props.siteName} crazyMode={this.props.crazyMode}/>
            <PageNav mainMenu={this.props.menuItems.get('main')} extraMenu={this.props.menuItems.get('extra')}/>
            <PageMain recentArticles={this.props.recentArticles} content={this.props.children}/>
            <PageFooter copyright={this.props.copyright}/>
          </Container>
        </Base>
      </ThemeProvider>
    )
  }
}
