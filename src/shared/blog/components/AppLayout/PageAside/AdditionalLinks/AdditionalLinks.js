import React from 'react'
import styled from 'styled-components'

import NormalLink from '../../../base/NormalLink'

const Base = styled.section`
  margin: 30px;
  width: 340px;
  
  @media (max-width: 1200px) {
    display: none;
  }

  h2 {
    border-bottom: 1px solid #DDDDDD;
    padding-bottom: 10px;
  }
`

export default class AdditionalLinks extends React.Component {
  render () {
    return (
      <Base>
        <h2></h2>
        <ul>
          <li><NormalLink to='/articles/archives/'>所有文章列表</NormalLink></li>
        </ul>
      </Base>
    )
  }
}
