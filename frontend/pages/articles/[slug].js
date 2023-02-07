import {BACKEND_SERVER_URL} from '../../config'
import * as actions from '../../redux/article/actions'
import {wrapper} from '../../redux/store'
import fetchJSON from '../../lib/fetchJSON'
import ArticleDetailContainer from '../../components/containers/ArticleDetailContainer'
import AppLayout from '../../components/elements/layout/AppLayout'


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
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default function ArticleDetailPage({slug}) {
  return (
    <AppLayout>
      <ArticleDetailContainer slug={slug}/>
    </AppLayout>
  )
}
