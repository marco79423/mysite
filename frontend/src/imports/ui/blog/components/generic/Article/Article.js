import React from 'react'
import styled from 'styled-components'
import {LikeCoinButton} from '@paji-sdk/browser'

import TitleLink from '../TitleLink'
import Loading from '../Loading'
import RstContent from '../RstContent'
import SocialShare from './SocialShare'
import Metadata from './Metadata'
import ArticleComment from './ArticleComment'


const Base = styled.article`
  background: ${props => props.theme.page.main.content.article.background};
  padding: 32px;
`

const Header = styled.header`
  h1 {
    margin: 3px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export default class Article extends React.PureComponent {

  renderHeader = () => {
    const {article} = this.props
    return (
      <Header>
        <h1><TitleLink to={`/articles/${article.slug}/`}>{article.title}</TitleLink></h1>
        {this.renderMetadata()}
      </Header>
    )
  }

  renderMetadata = () => {
    const {article} = this.props
    return (
      <Metadata
        categories={article.categories}
        chickenCount={article.chickenCount}
        date={article.date}
        modifiedDate={article.modifiedDate}/>
    )
  }

  renderSummary = () => {
    return <RstContent content={this.props.article.summary}/>
  }

  renderContent = () => {
    const {article, socialConfig, commentConfig} = this.props
    return [
      <RstContent key="article-content" content={article.content}/>,
      <LikeCoinButton
        key="likeCoin"
        creatorLikeID={'marco79423'}
        url={socialConfig?.shareUrl}
        style={{marginTop: 48, height: 212, width: '100%'}}/>,
      <SocialShare key="social-share" config={socialConfig}/>,
      <ArticleComment key="comment" config={commentConfig}/>
    ]
  }

  render() {
    const {article, summaryMode} = this.props
    if (!article) {
      return (
        <Base>
          <Loading/>
        </Base>
      )
    }

    return (
      <Base>
        {this.renderHeader()}
        {summaryMode ? this.renderSummary() : this.renderContent()}
      </Base>
    )
  }
}

