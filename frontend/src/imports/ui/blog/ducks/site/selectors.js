import fp from 'lodash/fp'
import {createSelector} from 'reselect'

import * as configSelectors from '../config/selectors'
import * as articleSelectors from '../article/selectors'
import * as routingSelectors from '../router/selectors'

export const getSiteHeadConfig = createSelector(
  [
    configSelectors.getSiteName,
    configSelectors.getSiteMeta,
    configSelectors.getSiteLink
  ],
  (siteName, siteMeta, siteLink) => ({
    title: siteName,
    meta: fp.flow(
      fp.keys,
      fp.map(name => ({
        name: name,
        content: siteMeta[name],
      })),
    )(siteMeta),
    link: fp.flow(
      fp.keys,
      fp.map(rel => ({
        rel: rel,
        href: siteLink[rel],
      })),
    )(siteLink),
  })
)


export const getArticleSiteHeadConfig = slug => createSelector(
  [
    getSiteHeadConfig,
    configSelectors.getSiteName,
    configSelectors.getSiteMeta,
    routingSelectors.getCurrentUrl,
    articleSelectors.getArticle(slug)
  ],
  (headConfig, siteName, siteMeta, currentUrl, article) => {
    if (!article) {
      return headConfig
    }

    const title = `${article.title} - ${siteName}`

    siteMeta = {
      ...siteMeta,
      description: article.rawSummary,
      'og:title': title,
      'og:url': currentUrl,
      'og:description': article.rawSummary,
    }

    return {
      ...headConfig,
      title: title,
      meta: fp.flow(
        fp.keys,
        fp.map(name => ({
          name: name,
          content: siteMeta[name],
        })),
      )(siteMeta),
    }
  }
)
