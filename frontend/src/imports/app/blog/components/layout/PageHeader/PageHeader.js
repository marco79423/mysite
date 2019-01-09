import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import NormalLink from '../../generic/NormalLink'
import intensifiesStyle from '../../generic/animation/intensifiesStyle'

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

const ModeName = styled.span`
  z-index: 9999;
  position: absolute;
  right: 18px;
  bottom: 8px;

  font-size: 2rem;
  font-weight: 700;
  
  ${intensifiesStyle}
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
    crazyMode: PropTypes.bool.isRequired
  }

  renderTitle = () => {
    return (
      <Title>
        <TitleLink to='/'><Logo src={require('../../../img/logo.png')}/>{this.props.siteName}</TitleLink>
      </Title>
    )
  }

  renderModeTitle = () => {
    return (
      <ModeName>瘋狂模式</ModeName>
    )
  }

  render () {
    return (
      <Base>
        {this.renderTitle()}
        {this.props.crazyMode && this.renderModeTitle()}
      </Base>
    )
  }
}
