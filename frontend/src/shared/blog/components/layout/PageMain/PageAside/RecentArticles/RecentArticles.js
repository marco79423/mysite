import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'

import NormalLink from '../../../../generic/NormalLink'
import Section from '../generic/Section'

const Base = styled(Section)`
  @media (max-width: 1200px) {
    display: none;
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
