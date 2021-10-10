import {wrapper} from '../../src/imports/ui/store'
import AppLayoutContainer from '../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleDetailContainer from '../../src/imports/ui/blog/containers/ArticleDetailContainer'

export const getServerSideProps = wrapper.getServerSideProps((store) => ({params}) => {
  return {props: {slug: params.slug}}
})

export default function ArticleDetailPage({slug}) {
  return (
    <AppLayoutContainer>
      <ArticleDetailContainer slug={slug}/>
    </AppLayoutContainer>
  )
}
