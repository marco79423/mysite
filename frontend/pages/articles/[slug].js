import {BACKEND_SERVER_URL} from '../../config'
import * as actions from '../../redux/article/actions'
import {wrapper} from '../../redux/store'
import fetchJSON from '../../lib/fetchJSON'
import AppLayout from '../../components/elements/layout/AppLayout'
import ArticleDetail from '../../components/elements/content/ArticleDetail'


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
      <ArticleDetail slug={slug}/>
    </AppLayout>
  )
}
