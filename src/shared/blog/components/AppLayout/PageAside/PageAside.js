import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AboutMe from './AboutMe'
import AdditionalLinks from './AdditionalLinks'
import RecentArticles from './RecentArticles'

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
