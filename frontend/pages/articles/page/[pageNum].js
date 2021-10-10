import AppLayoutContainer from '../../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../../../src/imports/ui/blog/containers/ArticleListContainer'


export async function getServerSideProps({params}) {
  return {props: {pageNum: params.pageNum}}
}

export default function ArticleListPage({pageNum}) {
  return (
    <AppLayoutContainer>
      <ArticleListContainer pageNum={pageNum}/>
    </AppLayoutContainer>
  )
}
