import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'

import NormalLink from '../../../../generic/NormalLink'

const Base = styled.section`
  margin: 30px;
  width: 340px;
  
  @media (max-width: 1200px) {
    display: none;
  }

  h2 {
    color: #6F6F6F;
    font-size: 1.5em;
    font-weight: 700;
    border-bottom: 1px solid #DDDDDD;
    padding-bottom: 10px;
  }

  li:not(:first-child) {
    margin-top: 8px;
  }
`

export default class RecentArticles extends React.Component {
  static PropTypes = {
    recentArticles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string
      })
    )
  }

  render () {
    return (
      <Base>
        <h2>近期文章</h2>
        <ul>
          {
            this.props.recentArticles.map(article => (
              <li key={article.get('slug')}>
                <NormalLink to={`/articles/${article.get('slug')}/`}>
                  {article.get('title')}
                </NormalLink>
              </li>
            ))
          }
        </ul>
      </Base>
    )
  }
}
