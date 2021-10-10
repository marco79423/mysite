import {wrapper} from '../../../../src/imports/ui/store'
import AppLayoutContainer from '../../../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../../../../src/imports/ui/blog/containers/ArticleListContainer'


export const getServerSideProps = wrapper.getServerSideProps((store) => ({params}) => {
  return {props: {category: params.category, pageNum: params.pageNum}}
})

export default function ArticleListPage({category, pageNum}) {
  return (
    <AppLayoutContainer>
      <ArticleListContainer category={category} pageNum={+pageNum || 1}/>
    </AppLayoutContainer>
  )
}
