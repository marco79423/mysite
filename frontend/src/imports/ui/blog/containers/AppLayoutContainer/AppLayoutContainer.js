import React, {useEffect} from 'react'
import {useDispatch, useSelector, useStore} from 'react-redux'

import SiteHead from '../../components/generic/SiteHead'
import AppLayout from '../../components/layout/AppLayout'

import * as articleActions from '../../ducks/article/actions'
import * as siteSelectors from '../../ducks/site/selectors'
import * as configSelectors from '../../ducks/config/selectors'
import * as articleSelectors from '../../ducks/article/selectors'


export default function AppLayoutContainer({children}) {
  const dispatch = useDispatch()
  const siteHeadConfig = useSelector(siteSelectors.getSiteHeadConfig)
  const siteName = useSelector(configSelectors.getSiteName)
  const menuItems = useSelector(configSelectors.getMenuItems)
  const theme = useSelector(configSelectors.getTheme)
  const relatedSites = useSelector(configSelectors.getRelatedSites)
  const recentArticles = useSelector(articleSelectors.getRecentArticles)
  const copyright = useSelector(configSelectors.getCopyright)

  const store = useStore()
  const crazyMode = store.getState().lab.crazyMode

  useEffect(() => {
    dispatch(articleActions.fetchArticles())
  }, [dispatch])

  return (
    <AppLayout
      siteName={siteName}
      menuItems={menuItems}
      theme={theme}
      relatedSites={relatedSites}
      recentArticles={recentArticles}
      copyright={copyright}
      crazyMode={crazyMode}
    >
      <SiteHead config={siteHeadConfig}/>
      {
        children
      }
    </AppLayout>
  )
}
