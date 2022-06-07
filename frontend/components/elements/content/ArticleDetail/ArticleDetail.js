import React from 'react'
import styled from 'styled-components'
import {NextSeo} from 'next-seo'
import {useCanonicalUrl} from '@paji-sdk/next-lib'

import Article from '../../generic/Article'
import Loading from '../../generic/Loading'
import {HOST_URL} from '../../../../config'


const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

function ArticleDetail({article, socialConfig, commentConfig}) {
  const canonicalUrl = useCanonicalUrl(HOST_URL)

  if (!article) {
    return (
      <Base>
        <Loading/>
      </Base>
    )
  }

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.rawSummary.replaceAll('\n', '')}
        canonical={canonicalUrl}

        openGraph={{
          images: [
            {url: article.cover},
          ],
        }}
      />

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
