import React from 'react'
import styled from 'styled-components'
import {LikeCoinButton} from '@paji-sdk/browser'

import TitleLink from '../TitleLink'
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

  renderSummary = () => {
    return <RstContent content={this.props.article.summary}/>
  }

  renderContent = () => {
    const {article, commentConfig} = this.props
    return [
      <RstContent key="article-content" content={article.content}/>,
      <LikeCoinButton
        key="likeCoin"
        creatorLikeID={'marco79423'}
        url={article.url}
        style={{marginTop: 48, height: 212, width: '100%'}}/>,
      <SocialShare key="social-share" config={{
        title: article.title,
        shareUrl: article.url,
      }}/>,
      <ArticleComment key="comment" config={commentConfig}/>
    ]
  }

  render() {
    const {article, summaryMode} = this.props
    return (
      <Base>
        <Header>
          <h1><TitleLink to={article.path}>{article.title}</TitleLink></h1>
          <Metadata
            categories={article.categories}
            chickenCount={article.chickenCount}
            date={article.date}
            modifiedDate={article.modifiedDate}/>
        </Header>

        {summaryMode ? this.renderSummary() : this.renderContent()}
      </Base>
    )
  }
}

