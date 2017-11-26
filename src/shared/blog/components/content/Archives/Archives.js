import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import NormalLink from '../../generic/NormalLink'
import TitleLink from '../../generic/TitleLink'
import dateformat from 'dateformat'
import styled from 'styled-components'
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

const ArticleTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 1.2em;

  tr {
    background: #eee;

    &:nth-of-type(even) {
      background: #f9f9f9;
    }

    td {
      padding: 0.6em;
      border: 1px solid #ccc;
    }
  }
`

export default class Archives extends React.PureComponent {
  static PropTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.any.isRequired
      })
    )
  }

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
      <ArticleTable>
        <tbody>
        {articles.map(article => (
          <tr key={article.get('slug')}>
            <td>{dateformat(article.get('date'), 'yyyy/mm/dd')}</td>
            <td><NormalLink to={`/articles/${article.get('slug')}/`}>{article.get('title')}</NormalLink></td>
          </tr>
        ))}
        </tbody>
      </ArticleTable>
    )
  }

  render () {
    const {articles} = this.props
    if (articles.isEmpty()) {
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
