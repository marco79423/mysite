import {wrapper} from '../redux/store'
import fetchJSON from '../lib/fetchJSON'
import {BACKEND_SERVER_URL} from '../config'
import * as actions from '../redux/article/actions'
import AppLayoutContainer from '../components/containers/AppLayoutContainer'
import ArticleListContainer from '../components/containers/ArticleListContainer'


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data
  store.dispatch(actions.setArticles(articles))
})

export default function ArticleListPage() {
  return (
    <AppLayoutContainer>
      <ArticleListContainer pageNum={1}/>
    </AppLayoutContainer>
  )
}
