import React from 'react'
import dateformat from 'dateformat'
import styled from 'styled-components'

import {Table, Tbody, Td, Tr} from '../../generic/table'
import NormalLink from '../../generic/NormalLink'
import TitleLink from '../../generic/TitleLink'
import Loading from '../../generic/Loading'


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
  h1 {
    margin: 3px 0 24px;
  }
`

export default class Archives extends React.PureComponent {

  renderHeader = () => {
    return (
      <Header>
        <h1><TitleLink to='/articles/archives/'>所有文章列表</TitleLink></h1>
      </Header>
    )
  }

  renderArticleTable = () => {
    const {articles} = this.props
    return (
      <Table>
        <Tbody>
        {articles.map(article => (
          <Tr key={article.slug}>
            <Td>{dateformat(article.date, 'yyyy/mm/dd')}</Td>
            <Td><NormalLink to={`/articles/${article.slug}/`}>{article.title}</NormalLink></Td>
          </Tr>
        ))}
        </Tbody>
      </Table>
    )
  }

  render() {
    const {articles} = this.props
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
          {this.renderHeader()}
          {this.renderArticleTable()}
        </article>
      </Base>
    )
  }
}
