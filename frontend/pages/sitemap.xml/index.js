import {getServerSideSitemap} from 'next-sitemap'

import fetchJSON from '../../lib/fetchJSON'
import {BackendServerURL, HostUrl} from '../../config'

export const getServerSideProps = async (ctx) => {
  const resp = await fetchJSON(`${BackendServerURL}/api/articles/`)
  const articles = resp.data

  const fields = articles.map(article => ({
    loc: `${HostUrl}/articles/${article.slug}/`,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function Sitemap() {
}
