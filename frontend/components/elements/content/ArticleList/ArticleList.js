import React from 'react'
import styled from '@emotion/styled'

import {PageSize} from '../../../../config'
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

export default function ArticleList({articles, pageNum}) {
  const getPageLink = (pageNum) => {
    return `/articles/page/${pageNum}/`
  }

  return (
    <Base>
      <ul>
        {
          articles.slice((pageNum - 1) * PageSize, pageNum * PageSize).map(article => (
            <li key={article.slug}>
              <Article summaryMode={true} article={article}/>
            </li>
          ))
        }
      </ul>
      <Pagination
        current={pageNum}
        max={Math.ceil(articles.length / PageSize)}
        makeLink={getPageLink}
      />
    </Base>
  )
}
