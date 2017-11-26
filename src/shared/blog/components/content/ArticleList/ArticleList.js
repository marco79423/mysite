import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'

import Pagination from './Pagination'
import Article from '../../generic/Article'

const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }

  > ul li:not(:first-child) {
    margin-top: 3px;
  }
`

export default class ArticleList extends React.PureComponent {
  static propTypes = {
    articles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string,
        summary: PropTypes.string
      })
    ),
    pageNum: PropTypes.number,
    pageSize: PropTypes.number,

    getPageLink: PropTypes.func
  }

  renderArticleList = () => {
    const {articles, pageNum, pageSize} = this.props
    return (
      <ul>
        {
          articles.slice((pageNum - 1) * pageSize, pageNum * pageSize).map(article => (
            <li key={article.get('slug')}>
              <Article summaryMode={true} article={article}/>
            </li>
          ))
        }
      </ul>
    )
  }

  render () {
    const {articles, pageNum, pageSize, getPageLink} = this.props
    return (
      <Base>
        {this.renderArticleList()}
        <Pagination
          current={pageNum}
          max={Math.ceil(articles.count() / pageSize)}
          makeLink={getPageLink}
        />
      </Base>
    )
  }
}
