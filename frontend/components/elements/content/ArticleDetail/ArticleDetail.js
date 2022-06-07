import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Article from '../../generic/Article'
import Loading from '../../generic/Loading'


const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

function ArticleDetail({siteName, article, socialConfig, commentConfig}) {
  if (!article) {
    return (
      <Base>
        <Loading/>
      </Base>
    )
  }

  const title = `${article.title} - ${siteName}`
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={article.rawSummary}/>
        <meta name="og:title" content={title}/>
        <meta name="og:url" content={article.url}/>
        <meta name="og:description" content={article.rawSummary}/>
      </Head>

      <Base>
        <Article
          summaryMode={false}
          article={article}
          socialConfig={socialConfig}
          commentConfig={commentConfig}
        />
      </Base>
    </>
  )
}

export default React.memo(ArticleDetail)
