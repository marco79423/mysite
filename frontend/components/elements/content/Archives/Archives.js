import React from 'react'
import dateformat from 'dateformat'
import styled from '@emotion/styled'

import {Table, Tbody, Td, Tr} from '../../generic/table'
import NormalLink from '../../generic/NormalLink'
import TitleLink from '../../generic/TitleLink'


const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }

  article {
    padding: 2em;
    border-bottom: 1px solid #eee;
    background: white;

    table {
      
    }
  }
`

const Header = styled.header`
  h2 {
    margin: 3px 0 24px;
  }
`

export default function Archives({articles}) {
  return (
    <Base>
      <article>
        <Header>
          <h2><TitleLink href='/articles/archives/'>所有文章列表</TitleLink></h2>
        </Header>
        <Table>
          <Tbody>
            {articles.map(article => (
              <Tr key={article.slug}>
                <Td>{dateformat(article.date, 'yyyy/mm/dd')}</Td>
                <Td><NormalLink href={`/articles/${article.slug}/`}>{article.title}</NormalLink></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </article>
    </Base>
  )
}
