import React from 'react'
import {normalize} from 'polished'
import {Global, css, ThemeProvider} from '@emotion/react'

import theme from '../../theme/default'
import PageHeader from './PageHeader'
import PageNav from './PageNav'
import PageMain from './PageMain'
import PageFooter from './PageFooter'
import {MenuItems, RelatedSites, SiteName} from '../../../config'


export default function AppLayout({recentArticles, children}) {
  const styles = {
    root: css`
      width: 100%;
      height: 100%;

      color: ${theme.global.fontColor};
      background: ${theme.page.background};
    `,
    container: css`
      position: relative;

      width: 1200px;
      margin: 0 auto;

      @media (max-width: 1200px) {
        width: 100%;
      }
    `
  }

  return (
    <ThemeProvider theme={theme}>
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
        <div css={styles.root}>
          <div css={styles.container}>
            <PageHeader siteName={SiteName}/>
            <PageNav mainMenu={MenuItems.main} extraMenu={MenuItems.extra}/>
            <PageMain
              relatedSites={RelatedSites}
              recentArticles={recentArticles}
              content={children}/>
            <PageFooter/>
          </div>
        </div>
      </>
    </ThemeProvider>
  )
}