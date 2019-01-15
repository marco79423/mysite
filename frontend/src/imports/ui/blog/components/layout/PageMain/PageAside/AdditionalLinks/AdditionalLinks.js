import React from 'react'
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

export default class AdditionalLinks extends React.Component {
  render () {
    return (
      <Base>
        <ul>
          <li><NormalLink to='/articles/archives/'>所有文章列表</NormalLink></li>
        </ul>
      </Base>
    )
  }
}
