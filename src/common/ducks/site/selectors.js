import {createSelector} from 'reselect'
import * as Immutable from 'immutable'

import * as configSelectors from '../config/selectors'
import * as articleSelectors from '../article/selectors'
import * as routingSelectors from '../routing/selectors'


export const getSiteHeadConfig = createSelector(
  [
    configSelectors.getSiteName,
    configSelectors.getSiteMeta
  ],
  (siteName, siteMeta) => Immutable.Map({
    title: siteName,
    meta: siteMeta
      .entrySeq()
      .map(([name, content]) => Immutable.Map({name, content}))
  })
)


export const getArticleSiteHeadConfig = createSelector(
  [
    routingSelectors.getPathName,
    configSelectors.getSiteName,
    configSelectors.getSiteMeta,
    articleSelectors.getArticle
  ],
  (pathName, siteName, siteMeta, article) => {
    const title = `${article.get('title')} - ${siteName}`
    return Immutable.Map({
      title: title,
      meta: siteMeta
        .merge({
          description: article.get('rawSummary'),
          'og:title': title,
          'og:url': pathName,
          'og:description': article.get('rawSummary')
        })
        .entrySeq()
        .map(([name, content]) => Immutable.Map({name, content}))
    })
  }
)


