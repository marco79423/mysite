import React from 'react'
import dateformat from 'dateformat'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'

import {Table, Tbody, Td, Tr} from '../../generic/table'
import NormalLink from '../../generic/NormalLink'
import TitleLink from '../../generic/TitleLink'
import Loading from '../../generic/Loading'
import * as articleSelectors from '../../../../redux/article/selectors'
import * as articleActions from '../../../../redux/article/actions'


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

export default function Archives() {
  const dispatch = useDispatch()
  const articles = useSelector(articleSelectors.getArticles)

  React.useEffect(() => {
    if (articles.length === 0) {
      dispatch(articleActions.fetchArticles())
    }
  }, [articles])


  if (articles.length === 0) {
    return (
      <Base>
        <Loading/>
      </Base>
    )
  }

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
