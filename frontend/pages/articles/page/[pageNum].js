import {NextSeo} from 'next-seo'

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
      pageNum: params.pageNum,
    }
  }
}

export default function ArticleListPage({articles, pageNum, recentArticles}) {
  return (
    <>
      <NextSeo noindex={true}/>
      <AppLayout recentArticles={recentArticles}>
        <ArticleList articles={articles} pageNum={+pageNum || 1}/>
      </AppLayout>
    </>
  )
}
