import React from 'react'
import styled from '@emotion/styled'
import {NextSeo} from 'next-seo'

import Article from '../../generic/Article'
import {CommentConfig, HostUrl} from '../../../../config'
import useCanonicalUrl from '../../../../lib/useCanonicalUrl'


const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

function ArticleDetail({article}) {
  const canonicalUrl = useCanonicalUrl(HostUrl)

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.rawSummary.replaceAll('\n', '')}
        canonical={canonicalUrl}

        openGraph={article.cover ? {
          images: [
            {url: article.cover},
          ],
        }: undefined}
      />

      <Base>
        <Article
          summaryMode={false}
          article={article}
          commentConfig={CommentConfig}
        />
      </Base>
    </>
  )
}

export default React.memo(ArticleDetail)
