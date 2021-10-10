import AppLayoutContainer from '../../../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../../../../src/imports/ui/blog/containers/ArticleListContainer'


export async function getServerSideProps({params}) {
  return {props: {category: params.category, pageNum: params.pageNum}}
}

export default function ArticleListPage({category, pageNum}) {
  return (
    <AppLayoutContainer>
      <ArticleListContainer category={category} pageNum={pageNum}/>
    </AppLayoutContainer>
  )
}
