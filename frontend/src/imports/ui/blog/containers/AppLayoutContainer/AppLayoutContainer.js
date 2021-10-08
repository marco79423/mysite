import React from 'react'
import {useSelector} from 'react-redux'

import SiteHead from '../../components/generic/SiteHead'
import AppLayout from '../../components/layout/AppLayout'
import * as siteSelectors from '../../ducks/site/selectors'
import * as configSelectors from '../../ducks/config/selectors'
import * as articleSelectors from '../../ducks/article/selectors'


export default function AppLayoutContainer({children}) {
  const siteHeadConfig = useSelector(siteSelectors.getSiteHeadConfig)
  const siteName = useSelector(configSelectors.getSiteName)
  const menuItems = useSelector(configSelectors.getMenuItems)
  const theme = useSelector(configSelectors.getTheme)
  const relatedSites = useSelector(configSelectors.getRelatedSites)
  const recentArticles = useSelector(articleSelectors.getRecentArticles)
  const copyright = useSelector(configSelectors.getCopyright)

  return (
    <AppLayout
      siteName={siteName}
      menuItems={menuItems}
      theme={theme}
      relatedSites={relatedSites}
      recentArticles={recentArticles}
      copyright={copyright}
    >
      <SiteHead config={siteHeadConfig}/>
      {
        children
      }
    </AppLayout>
  )
}
