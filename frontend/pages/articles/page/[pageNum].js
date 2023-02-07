import {wrapper} from '../../../redux/store'
import fetchJSON from '../../../lib/fetchJSON'
import {BACKEND_SERVER_URL} from '../../../config'
import * as actions from '../../../redux/article/actions'
import AppLayout from '../../../components/elements/layout/AppLayout'
import ArticleList from '../../../components/elements/content/ArticleList'


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data
  store.dispatch(actions.setArticles(articles))

  return {props: {pageNum: params.pageNum}}
})

export default function ArticleListPage({pageNum}) {
  return (
    <AppLayout>
      <ArticleList pageNum={+pageNum || 1}/>
    </AppLayout>
  )
}
