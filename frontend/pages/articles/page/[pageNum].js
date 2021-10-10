import {wrapper} from '../../../src/imports/ui/store'
import AppLayoutContainer from '../../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../../../src/imports/ui/blog/containers/ArticleListContainer'


export const getServerSideProps = wrapper.getServerSideProps((store) => ({params}) => {
  return {props: {pageNum: params.pageNum}}
})

export default function ArticleListPage({pageNum}) {
  return (
    <AppLayoutContainer>
      <ArticleListContainer pageNum={+pageNum || 1}/>
    </AppLayoutContainer>
  )
}
