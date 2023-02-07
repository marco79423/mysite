import {BACKEND_SERVER_URL} from '../../config'
import {wrapper} from '../../redux/store'
import fetchJSON from '../../lib/fetchJSON'
import * as actions from '../../redux/article/actions'
import ArchivesContainer from '../../components/containers/ArchivesContainer'
import AppLayout from '../../components/elements/layout/AppLayout'

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
  const resp = await fetchJSON(`${BACKEND_SERVER_URL}/api/articles/`)
  const articles = resp.data
  store.dispatch(actions.setArticles(articles))
})

export default function ArchivesPage() {
  return (
    <AppLayout>
      <ArchivesContainer/>
    </AppLayout>
  )
}
