import {wrapper} from '../../../redux/store'
import fetchJSON from '../../../lib/fetchJSON'
import {BACKEND_SERVER_URL} from '../../../config'
import * as actions from '../../../redux/article/actions'
import ArticleListContainer from '../../../components/containers/ArticleListContainer'
import AppLayout from '../../../components/elements/layout/AppLayout'


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data
  store.dispatch(actions.setArticles(articles))

  return {props: {pageNum: params.pageNum}}
})

export default function ArticleListPage({pageNum}) {
  return (
    <AppLayout>
      <ArticleListContainer pageNum={+pageNum || 1}/>
    </AppLayout>
  )
}
