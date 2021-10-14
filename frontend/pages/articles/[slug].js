import {BACKEND_SERVER_URL} from '../../config'
import * as actions from '../../redux/article/actions'
import {wrapper} from '../../redux/store'
import fetchJSON from '../../lib/fetchJSON'
import AppLayoutContainer from '../../components/containers/AppLayoutContainer'
import ArticleDetailContainer from '../../components/containers/ArticleDetailContainer'

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
  const {slug} = params

  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/${slug}`)
  const article = resp.data
  store.dispatch(actions.setArticle(article))

  return {props: {slug}}
})

export default function ArticleDetailPage({slug}) {
  return (
    <AppLayoutContainer>
      <ArticleDetailContainer slug={slug}/>
    </AppLayoutContainer>
  )
}
