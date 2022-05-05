import {getServerSideSitemap} from 'next-sitemap'

import fetchJSON from '../../lib/fetchJSON'
import {BACKEND_SERVER_URL, HOST_URL} from '../../config'

export const getServerSideProps = async (ctx) => {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data

  const fields = articles.map(article => ({
    loc: `${HOST_URL}/articles/${article.slug}/`,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function Sitemap() {
}
