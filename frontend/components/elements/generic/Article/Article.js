import React from 'react'
import {LikeCoinButton} from '@paji-sdk/web'
import {css, useTheme} from '@emotion/react'

import TitleLink from '../TitleLink'
import RstContent from '../RstContent'
import SocialShare from './SocialShare'
import Metadata from './Metadata'
import ArticleComment from './ArticleComment'


function Article({article, summaryMode, commentConfig}) {
  const theme = useTheme()
  const styles = {
    root: css`
      background: ${theme.page.main.content.article.background};
      padding: 32px;
    `,
    header: css`
      h2 {
        margin: 3px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `
  }

  return (
    <article css={styles.root}>
      <header css={styles.header}>
        <h2><TitleLink href={article.path}>{article.title}</TitleLink></h2>
        <Metadata
          categories={article.categories}
          chickenCount={article.chickenCount}
          date={article.date}
          modifiedDate={article.modifiedDate}/>
      </header>

      {summaryMode ? (
        <RstContent content={article.summary}/>
      ) : (
        <>
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
        </>
      )}
    </article>
  )
}


export default React.memo(Article)
