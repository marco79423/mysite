import {createSelector} from 'reselect'
import * as Immutable from 'immutable'

import * as configSelectors from '../config/selectors'
import * as articleSelectors from '../article/selectors'
import * as routingSelectors from '../routing/selectors'

export const getSiteHeadConfig = createSelector(
  [
    configSelectors.getSiteName,
    configSelectors.getSiteMeta,
    configSelectors.getSiteLink
  ],
  (siteName, siteMeta, siteLink) => Immutable.Map({
    title: siteName,
    meta: siteMeta
      .entrySeq()
      .map(([name, content]) => Immutable.Map({name, content}))
      .toList(),
    link: siteLink
      .entrySeq()
      .map(([rel, href]) => Immutable.Map({rel, href}))
      .toList()
  })
)

export const getArticleSiteHeadConfig = createSelector(
  [
    getSiteHeadConfig,
    configSelectors.getSiteName,
    configSelectors.getSiteMeta,
    routingSelectors.getCurrentUrl,
    articleSelectors.getArticle
  ],
  (headConfig, siteName, siteMeta, currentUrl, article) => {
    if (!article) {
      return headConfig
    }

    const title = `${article.get('title')} - ${siteName}`
    return headConfig.merge(Immutable.Map({
      title: title,
      meta: siteMeta
        .merge({
          description: article.get('rawSummary'),
          'og:title': title,
          'og:url': currentUrl,
          'og:description': article.get('rawSummary')
        })
        .entrySeq()
        .map(([name, content]) => Immutable.Map({name, content}))
        .toList()
    }))
  }
)
