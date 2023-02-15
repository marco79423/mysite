import AppLayout from '../../components/elements/layout/AppLayout'
import Archives from '../../components/elements/content/Archives'
import {fetchArticles, fetchRecentArticles} from '../../lib/fetcher'

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
    <AppLayout recentArticles={recentArticles}>
      <Archives articles={articles}/>
    </AppLayout>
  )
}
