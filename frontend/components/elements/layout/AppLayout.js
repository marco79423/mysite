import React from 'react'
import {normalize} from 'polished'
import {Global, css, ThemeProvider} from '@emotion/react'

import theme from '../../theme/default'
import PageHeader from './PageHeader'
import PageNav from './PageNav'
import PageMain from './PageMain'
import PageFooter from './PageFooter'
import {MENU_ITEMS, RELATED_SITES, SITE_NAME} from '../../../config'
import {useSelector} from 'react-redux'
import * as articleSelectors from '../../../redux/article/selectors'


export default function AppLayout({children}) {
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

  const recentArticles = useSelector(articleSelectors.getRecentArticles)

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
            <PageHeader siteName={SITE_NAME}/>
            <PageNav mainMenu={MENU_ITEMS.main} extraMenu={MENU_ITEMS.extra}/>
            <PageMain
              relatedSites={RELATED_SITES}
              recentArticles={recentArticles}
              content={children}/>
            <PageFooter/>
          </div>
        </div>
      </>
    </ThemeProvider>
  )
}