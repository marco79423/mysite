import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import NormalLink from '../../generic/NormalLink'

const Base = styled.header`
  height: 90px;
  background: ${props => props.theme.page.header.background};
  position: relative;
`

const Title = styled.h1`
  position: relative;
  margin: 0;
  line-height: 90px;
  padding-left: 116px;
`

const Logo = styled.img`
  position: absolute;
  top: 18px;
  left: 28px;
  width: 54px;
  height: 54px;

  transform: rotate(-10deg);
  transition-duration: 0.8s;
  -webkit-backface-visibility: hidden;

  &:hover {
    transform: rotate(10deg);
  }
`

const TitleLink = styled(NormalLink)`
  color: ${props => props.theme.page.header.titleColor};
  font-size:2.5rem;
  
  &:hover {
    color: ${props => props.theme.page.header.titleColor};
  }
  
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`

export default class PageHeader extends React.Component {
  static propTypes = {
    siteName: PropTypes.string.isRequired,
  }

  renderTitle = () => {
    return (
      <Title>
        <TitleLink href="/">
          <Logo src={'/img/logo@58x58.png'}/>{this.props.siteName}
        </TitleLink>
      </Title>
    )
  }

  render() {
    return (
      <Base>
        {this.renderTitle()}
      </Base>
    )
  }
}
