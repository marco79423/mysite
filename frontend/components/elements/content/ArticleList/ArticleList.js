import React from 'react'
import styled from '@emotion/styled'

import Pagination from './Pagination'
import Article from '../../generic/Article'
import {useDispatch, useSelector} from 'react-redux'
import * as configSelectors from '../../../../redux/config/selectors'
import * as articleSelectors from '../../../../redux/article/selectors'
import * as articleActions from '../../../../redux/article/actions'

const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }

  > ul li:not(:first-of-type) {
    margin-top: 3px;
  }
`

export default function ArticleList({category, pageNum}) {
  const dispatch = useDispatch()

  const pageSize = useSelector(configSelectors.getPageSize)
  const allArticles = useSelector(articleSelectors.getArticles)
  const categoryArticles = useSelector(articleSelectors.getArticlesByCategory(category))
  const articles = category ? categoryArticles : allArticles

  React.useEffect(() => {
    if (allArticles.length === 0) {
      dispatch(articleActions.fetchArticles())
    }
  }, [allArticles])

  const getPageLink = (pageNum) => {
    if (category) {
      return `/articles/category/${category}/page/${pageNum}/`
    } else {
      return `/articles/page/${pageNum}/`
    }
  }

  return (
    <Base>
      <ul>
        {
          articles.slice((pageNum - 1) * pageSize, pageNum * pageSize).map(article => (
            <li key={article.slug}>
              <Article summaryMode={true} article={article}/>
            </li>
          ))
        }
      </ul>
      <Pagination
        current={pageNum}
        max={Math.ceil(articles.length / pageSize)}
        makeLink={getPageLink}
      />
    </Base>
  )
}
