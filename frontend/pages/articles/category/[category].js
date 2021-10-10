import AppLayoutContainer from '../../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../../../src/imports/ui/blog/containers/ArticleListContainer'


export async function getServerSideProps({params}) {
  return {props: {category: params.category}}
}

export default function ArticleListPage({category}) {
  return (
    <AppLayoutContainer>
      <ArticleListContainer category={category}/>
    </AppLayoutContainer>
  )
}
