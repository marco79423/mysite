import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Table, Tbody, Tr, Td} from '../../generic/table'
import TitleLink from '../../generic/TitleLink'

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

    a {
      font-size: 2rem;
    }
  }
`

export default class SiteInfo extends React.PureComponent {
  static PropTypes = {
    repositoryVersion: PropTypes.string.isRequired,
    updatedTime: PropTypes.string.isRequired
  }

  renderHeader = () => {
    return (
      <Header>
        <h1><TitleLink to='/info/'>網站資訊</TitleLink></h1>
      </Header>
    )
  }

  renderInfoTable = () => {
    return (
      <Table>
        <Tbody>
        <Tr>
          <Td>網站更新時間：</Td>
          <Td>{this.props.updatedTime}</Td>
        </Tr>
        <Tr>
          <Td>儲存庫版本：</Td>
          <Td>{this.props.repositoryVersion}</Td>
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
          {this.renderInfoTable()}
        </article>
      </Base>
    )
  }
}
