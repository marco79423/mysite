import {wrapper} from '../../../src/imports/ui/store'

import AppLayoutContainer from '../../../src/imports/ui/blog/containers/AppLayoutContainer'
import ArticleListContainer from '../../../src/imports/ui/blog/containers/ArticleListContainer'


export const getServerSideProps = wrapper.getServerSideProps((store) => ({params}) => {
  return {props: {category: params.category}}
})

export default function ArticleListPage({category}) {
  return (
    <AppLayoutContainer>
      <ArticleListContainer category={category} pageNum={1}/>
    </AppLayoutContainer>
  )
}
