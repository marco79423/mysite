import React from 'react'
import styled from '@emotion/styled'

import NormalLink from '../../generic/NormalLink'

const Base = styled.nav`
  height: 42px;
  background: ${props => props.theme.page.nav.background};
`

const MenuLink = styled(NormalLink)`
  display: block;
  height: 42px;
  line-height: 42px;
  padding: 0 16px;
  font-size: 1.2rem;
  color: ${props => props.theme.page.nav.menu.color};
  background: ${props => props.theme.page.nav.menu.background};
  font-weight: 700;

  &:hover {
    color: ${props => props.theme.page.nav.menu.color};
    background: ${props => props.theme.page.nav.menu.hoverBackground};
  }
  
  @media (max-width: 1200px) {
    background: ${props => props.theme.page.nav.menu.dropdown.background};
  }
`

const MenuContainer = styled.div`
  @media (max-width: 1200px) {
    position: absolute;
    &:hover {
      width: 160px;

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
    background: ${props => props.theme.page.nav.menu.background};
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
      float: none;
      width: 100%;
    }
  }
`

const MainMenu = styled(BaseMenu)`
  float: left;

  @media (max-width: 1200px) {
    float: none;
  }
`

const ExtraMenu = styled(BaseMenu)`
  float: right;
  
  @media (max-width: 1200px) {
    float: none;
    border-top: 3px ${props => props.theme.page.nav.menu.dropdown.borderColor} solid;
  }
`

function PageNav({mainMenu, extraMenu}) {
  return (
    <Base>
      <MenuContainer>
        <MenuToggle href="#">選單</MenuToggle>
        <MainMenu>
          {mainMenu.map(item => (
            <li key={item.url}><MenuLink href={item.url}>{item.name}</MenuLink></li>
          ))}
        </MainMenu>
        <ExtraMenu>
          {extraMenu.map(item => (
            <li key={item.url}><MenuLink href={item.url} target="_blank">{item.name}</MenuLink></li>
          ))}
        </ExtraMenu>
      </MenuContainer>
    </Base>
  )
}

export default React.memo(PageNav)