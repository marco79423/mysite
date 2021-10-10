import {BACKEND_SERVER_URL} from '../../src/imports/config'
import {wrapper} from '../../src/imports/ui/store'
import AppLayoutContainer from '../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleDetailContainer from '../../src/imports/ui/blog/containers/ArticleDetailContainer'
import fetchJSON from '../../src/imports/lib/fetchJSON'
import * as actions from '../../src/imports/ui/blog/ducks/article/actions'

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
