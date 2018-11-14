import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Base = styled.footer`
  height: 42px;
  background: ${props => props.theme.page.footer.background};
`

const Copyright = styled.div`
  margin: 0 auto;
  text-align: center;
  line-height: 42px;
  color: ${props => props.theme.page.footer.copyrightColor};
`

export default class PageFooter extends React.Component {
  static PropTypes = {
    copyright: PropTypes.string,
  }

  render() {
    return (
      <Base>
        <Copyright>{this.props.copyright}</Copyright>
      </Base>
    )
  }
}
