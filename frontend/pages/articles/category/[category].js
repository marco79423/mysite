import {wrapper} from '../../../src/imports/ui/store'

import AppLayoutContainer from '../../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../../../src/imports/ui/blog/containers/ArticleListContainer'
import fetchJSON from '../../../src/imports/lib/fetchJSON'
import {BACKEND_SERVER_URL} from '../../../src/imports/config'
import * as actions from '../../../src/imports/ui/blog/ducks/article/actions'


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data
  store.dispatch(actions.setArticles(articles))

  return {props: {category: params.category}}
})

export default function ArticleListPage({category}) {
  return (
    <AppLayoutContainer>
      <ArticleListContainer category={category} pageNum={1}/>
    </AppLayoutContainer>
  )
}
