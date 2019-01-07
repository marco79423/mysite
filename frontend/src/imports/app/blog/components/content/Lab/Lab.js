import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Table, Tbody, Tr, Td} from '../../generic/table'
import NormalLink from '../../generic/NormalLink'
import TitleLink from '../../generic/TitleLink'

import Checkbox from '../../generic/Checkbox'

const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }

  article {
    min-height: 600px;
    padding: 2em;
    border-bottom: 1px solid #eee;
    background: white;
  }
`

const Header = styled.header`
  h1 {
    margin: 3px 0 24px;
  }
`

export default class Lab extends React.PureComponent {
  static PropTypes = {
    crazyMode: PropTypes.bool.isRequired,
    setCrazyMode: PropTypes.func.isRequired
  }

  renderHeader = () => {
    return (
      <Header>
        <h1><TitleLink to='/lab/'>兩大類實驗室</TitleLink></h1>
      </Header>
    )
  }

  renderItemTable = () => {
    return (
      <Table>
        <Tbody>
        <Tr>
          <Td>網站資訊頁面</Td>
          <Td>
            <NormalLink to={`/info/`}>連結</NormalLink>
          </Td>
        </Tr>
        <Tr>
          <Td>瘋狂模式</Td>
          <Td>
            <Checkbox checked={this.props.crazyMode} setChecked={this.props.setCrazyMode}/>
          </Td>
        </Tr>
        </Tbody>
      </Table>
    )
  }

  render () {
    return (
      <Base>
        <article>
          {this.renderHeader()}
          {this.renderItemTable()}
        </article>
      </Base>
    )
  }
}
