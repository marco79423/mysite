import React from 'react'
import {useSelector} from 'react-redux'

import * as configSelectors from '../../../redux/config/selectors'
import * as articleSelectors from '../../../redux/article/selectors'
import AppLayout from '../../elements/layout/AppLayout'


export default function AppLayoutContainer({children}) {
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
      {
        children
      }
    </AppLayout>
  )
}
