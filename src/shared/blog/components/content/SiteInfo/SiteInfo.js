import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const InfoTable = styled.table`
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

export default class SiteInfo extends React.PureComponent {
  static PropTypes = {
    frontendVersion: PropTypes.string.isRequired,
    backendVersion: PropTypes.string.isRequired,
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
      <InfoTable>
        <tbody>
        <tr>
          <td>網站更新時間：</td>
          <td>{this.props.updatedTime}</td>
        </tr>
        <tr>
          <td>前端版本：</td>
          <td>{this.props.frontendVersion}</td>
        </tr>
        <tr>
          <td>後端版本：</td>
          <td>{this.props.backendVersion}</td>
        </tr>
        </tbody>
      </InfoTable>
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