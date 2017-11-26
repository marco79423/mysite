import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AboutMe from './AboutMe/index'
import AdditionalLinks from './AdditionalLinks/index'
import RecentArticles from './RecentArticles/index'

const Base = styled.aside`
  float: left;

  @media (max-width: 1200px) {
    width: 100%;
    background: #1A6E8A;
  }
`

export default class PageAside extends React.Component {
  static PropTypes = {
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
