import AppLayout from '../../components/elements/layout/AppLayout'
import ArticleDetail from '../../components/elements/content/ArticleDetail'
import {fetchArticle, fetchRecentArticles} from '../../lib/fetcher'


export const getStaticProps = async ({params}) => {
  try {
    const {slug} = params

    const article = await fetchArticle(slug)
    const recentArticles = await fetchRecentArticles()

    return {
      props: {
        article,
        recentArticles,
      },
    }
  } catch (e) {
    return {
      props: {},
      notFound: true,
    }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default function ArticleDetailPage({article, recentArticles}) {
  return (
    <AppLayout recentArticles={recentArticles}>
      <ArticleDetail article={article}/>
    </AppLayout>
  )
}
