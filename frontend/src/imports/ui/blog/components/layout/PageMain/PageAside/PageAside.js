import React from 'react'
import styled from 'styled-components'

import AboutMe from './AboutMe'
import AdditionalLinks from './AdditionalLinks'
import RecentArticles from './RecentArticles'
import RelatedSites from './RelatedSites'

const Base = styled.aside`
  float: left;
  background: ${props => props.theme.page.main.aside.background};

  @media (max-width: 1200px) {
    width: 100%;
    background: ${props => props.theme.page.main.aside.darkerBackground};
  }
`

export default class PageAside extends React.Component {
  render() {
    return (
      <Base>
        <AboutMe/>
        <RelatedSites relatedSites={this.props.relatedSites}/>
        <RecentArticles recentArticles={this.props.recentArticles}/>
        <AdditionalLinks/>
      </Base>
    )
  }
}
