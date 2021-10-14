import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as articleActions from '../../../redux/article/actions'
import * as articleSelectors from '../../../redux/article/selectors'
import * as configSelectors from '../../../redux/config/selectors'
import ArticleList from '../../elements/content/ArticleList'


export default function ArticleListContainer({category, pageNum}) {
  const dispatch = useDispatch()

  const pageSize = useSelector(configSelectors.getPageSize)
  const articles = useSelector(articleSelectors.getArticles)
  const categoryArticles = useSelector(articleSelectors.getArticlesByCategory(category))

  React.useEffect(() => {
    if (articles.length === 0) {
      dispatch(articleActions.fetchArticles())
    }
  }, [articles])

  const getPageLink = (pageNum) => {
    if (category) {
      return `/articles/category/${category}/page/${pageNum}/`
    } else {
      return `/articles/page/${pageNum}/`
    }
  }

  return (
    <ArticleList
      articles={category ? categoryArticles : articles}
      pageSize={pageSize}
      pageNum={pageNum}
      getPageLink={getPageLink}
    />
  )
}
