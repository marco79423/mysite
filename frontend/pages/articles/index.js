import AppLayout from '../../components/elements/layout/AppLayout'
import ArticleList from '../../components/elements/content/ArticleList'
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

export default function ArticleListPage({articles, recentArticles}) {
  return (
    <AppLayout recentArticles={recentArticles}>
      <ArticleList articles={articles} pageNum={1}/>
    </AppLayout>
  )
}
