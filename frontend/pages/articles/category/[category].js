import AppLayout from '../../../components/elements/layout/AppLayout'
import ArticleList from '../../../components/elements/content/ArticleList'
import {fetchArticles, fetchRecentArticles} from '../../../lib/fetcher'


export const getServerSideProps = async ({params}) => {
  const articles = await fetchArticles()
  const recentArticles = await fetchRecentArticles()

  return {
    props: {
      articles,
      recentArticles,
      category: params.category,
    }
  }
}

export default function ArticleListPage({articles, category, recentArticles}) {
  return (
    <AppLayout recentArticles={recentArticles}>
      <ArticleList articles={articles} category={category} pageNum={1}/>
    </AppLayout>
  )
}
