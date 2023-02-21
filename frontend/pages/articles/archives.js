import {NextSeo} from 'next-seo'

import {fetchArticles, fetchRecentArticles} from '../../lib/fetcher'
import AppLayout from '../../components/elements/layout/AppLayout'
import Archives from '../../components/elements/content/Archives'

export const getServerSideProps = async () => {
  const articles = await fetchArticles()
  const recentArticles = await fetchRecentArticles()

  return {
    props: {
      articles,
      recentArticles,
    }
  }
}

export default function ArchivesPage({articles, recentArticles}) {
  return (
    <>
      <NextSeo noindex={true}/>
      <AppLayout recentArticles={recentArticles}>
        <Archives articles={articles}/>
      </AppLayout>
    </>
  )
}
