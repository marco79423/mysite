import React from 'react'
import {normalize} from 'polished'
import {Global, css, ThemeProvider} from '@emotion/react'
import styled from '@emotion/styled'

import PageHeader from './PageHeader'
import PageNav from './PageNav'
import PageMain from './PageMain'
import PageFooter from './PageFooter'



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

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <>
          <Global
            styles={css`
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
            `}
          />
          <Base>
            <Container>
              <PageHeader siteName={this.props.siteName}/>
              <PageNav mainMenu={this.props.menuItems.main} extraMenu={this.props.menuItems.extra}/>
              <PageMain
                relatedSites={this.props.relatedSites}
                recentArticles={this.props.recentArticles}
                content={this.props.children}/>
              <PageFooter copyright={this.props.copyright}/>
            </Container>
          </Base>
        </>
      </ThemeProvider>
    )
  }
}
