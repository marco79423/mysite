import React from 'react'
import styled from '@emotion/styled'

import {PAGE_SIZE} from '../../../../config'
import Pagination from './Pagination'
import Article from '../../generic/Article'
import fp from 'lodash/fp'

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

export default function ArticleList({articles, category, pageNum}) {
  const filteredArticles = React.useMemo(() => fp.flow(
    fp.filter(article => fp.flow(fp.some(c => !category || c.slug === category))(article.categories))
  )(articles), [articles, category])

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
          filteredArticles.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE).map(article => (
            <li key={article.slug}>
              <Article summaryMode={true} article={article}/>
            </li>
          ))
        }
      </ul>
      <Pagination
        current={pageNum}
        max={Math.ceil(filteredArticles.length / PAGE_SIZE)}
        makeLink={getPageLink}
      />
    </Base>
  )
}
