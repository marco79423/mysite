import {BACKEND_SERVER_URL} from '../../config'
import * as actions from '../../redux/article/actions'
import {wrapper} from '../../redux/store'
import fetchJSON from '../../lib/fetchJSON'
import AppLayoutContainer from '../../components/containers/AppLayoutContainer'
import ArticleDetailContainer from '../../components/containers/ArticleDetailContainer'


export const getStaticProps = wrapper.getStaticProps((store) => async ({params}) => {
  try {
    const {slug} = params

    const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/${slug}`)
    const article = resp.data
    store.dispatch(actions.setArticle(article))

    return {
      props: {slug},
    }
  } catch (e) {
    return {
      props: {},
      notFound: true,
    }
  }
})

export const getStaticPaths = async () => {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data

  const paths = articles.map((article) => ({
    params: {slug: article.slug},
  }))

  return {paths, fallback: 'blocking'}
}

export default function ArticleDetailPage({slug}) {
  return (
    <AppLayoutContainer>
      <ArticleDetailContainer slug={slug}/>
    </AppLayoutContainer>
  )
}
