import React from 'react'
import styled from 'styled-components'

import SiteHead from '../../generic/SiteHead'
import Article from '../../generic/Article'


const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

export default class ArticleDetail extends React.PureComponent {

  render() {
    return (
      <Base>
        <SiteHead config={this.props.siteConfig}/>
        <Article
          siteConfig={this.props.siteConfig}
          summaryMode={false}
          article={this.props.article}
          socialConfig={this.props.socialConfig}
          commentConfig={this.props.commentConfig}
        />
      </Base>
    )
  }
}
