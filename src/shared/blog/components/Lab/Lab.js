import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import NormalLink from '../generic/NormalLink'
import TitleLink from '../generic/TitleLink'

import Checkbox from '../Checkbox/index'

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

const ItemTable = styled.table`
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
      <ItemTable>
        <tbody>
        <tr>
          <td>網站資訊頁面</td>
          <td>
            <NormalLink to={`/info/`}>連結</NormalLink>
          </td>
        </tr>
        <tr>
          <td>瘋狂模式</td>
          <td>
            <Checkbox checked={this.props.crazyMode} setChecked={this.props.setCrazyMode}/>
          </td>
        </tr>
        </tbody>
      </ItemTable>
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
