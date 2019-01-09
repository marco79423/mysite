import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AboutMe from './AboutMe'
import AdditionalLinks from './AdditionalLinks'
import RecentArticles from './RecentArticles'

const Base = styled.aside`
  float: left;
  background: ${props => props.theme.page.main.aside.background};

  @media (max-width: 1200px) {
    width: 100%;
    background: ${props => props.theme.page.main.aside.darkerBackground};
  }
`

export default class PageAside extends React.Component {
  static propTypes = {
    recentArticles: PropTypes.string.isRequired
  }

  render () {
    return (
      <Base>
        <AboutMe/>
        <RecentArticles recentArticles={this.props.recentArticles}/>
        <AdditionalLinks/>
      </Base>
    )
  }
}
