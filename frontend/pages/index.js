import AppLayoutContainer from '../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../src/imports/ui/blog/containers/ArticleListContainer'


export default function ArticleListPage() {
  return (
    <AppLayoutContainer>
      <ArticleListContainer pageNum={1}/>
    </AppLayoutContainer>
  )
}
