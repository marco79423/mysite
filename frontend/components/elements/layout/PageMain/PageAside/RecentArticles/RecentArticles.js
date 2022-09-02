import React from 'react'
import styled from '@emotion/styled'

import NormalLink from '../../../../generic/NormalLink'
import Section from '../generic/Section'

const Base = styled(Section)`
  @media (max-width: 1200px) {
    display: none;
  }
  
  li:not(:first-of-type) {
    margin-top: 8px;
  }
`

export default class RecentArticles extends React.Component {

  render() {
    return (
      <Base>
        <h2>近期文章</h2>
        <ul>
          {
            this.props.recentArticles.map(article => (
              <li key={article.slug}>
                <NormalLink href={`/articles/${article.slug}/`}>
                  {article.title}
                </NormalLink>
              </li>
            ))
          }
        </ul>
      </Base>
    )
  }
}
