import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'

import NormalLink from '../../generic/NormalLink'

const Base = styled.nav`
  height: 42px;
  background: #1A6E8A;
`

const MenuLink = styled(NormalLink)`
  display: block;
  height: 42px;
  line-height: 42px;
  padding: 0 16px;
  font-size: 1.2rem;
  color: #ECECEC;
  font-weight: 700;

  &:hover {
    color: #ECECEC;
    background: #065A76;
  }
  
  @media (max-width: 1200px) {
    background: #388ca8;
  }
`

const MenuContainer = styled.div`
  @media (max-width: 1200px) {
    position: absolute;
    &:hover {
      width: 140px;

      ul {
        display: block;
      }
    }
  }
`

const MenuToggle = styled(MenuLink)`
  display: none;
  
  @media (max-width: 1200px) {
    display: block;
    background: #1A6E8A;
    &:hover {
      background: none;
    }
  }
`

const BaseMenu = styled.ul`
  li {
    float: left;
  }
  
  @media (max-width: 1200px) {
    display: none;

    li {
      width: 100%;
    }
  }
`

const MainMenu = BaseMenu.extend`
  float: left;
`

const ExtraMenu = BaseMenu.extend`
  float: right;
  
  @media (max-width: 1200px) {
    border-top: 3px #1A6E8A solid;
  }
`

export default class PageNav extends React.Component {
  static PropTypes = {
    mainMenu: ImmutablePropTypes.list.isRequired,
    extraMenu: ImmutablePropTypes.list.isRequired
  }

  renderMainMenu = () => {
    return (
      <MainMenu>
        {this.props.mainMenu.map(item => (
          <li key={item.get('url')}><MenuLink to={item.get('url')}>{item.get('name')}</MenuLink></li>
        ))}
      </MainMenu>
    )
  }

  renderExtraMenu = () => {
    return (
      <ExtraMenu>
        {this.props.extraMenu.map(item => (
          <li key={item.get('url')}><MenuLink to={item.get('url')}>{item.get('name')}</MenuLink></li>
        ))}
      </ExtraMenu>
    )
  }

  render () {
    return (
      <Base>
        <MenuContainer>
          <MenuToggle href="#">選單</MenuToggle>
          {this.renderMainMenu()}
          {this.renderExtraMenu()}
        </MenuContainer>
      </Base>
    )
  }
}
