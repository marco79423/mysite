import React from 'react'
import styled from 'styled-components'

const Base = styled.footer`
  height: 42px;
  background: #1A6E8A;
`

const Copyright = styled.div`
  margin: 0 auto;
  text-align: center;
  line-height: 42px;
  color: #ECECEC;
`

export default class PageFooter extends React.Component {
  render () {
    return (
      <Base>
        <Copyright>Copyright © 2017 - 兩大類</Copyright>
      </Base>
    )
  }
}
