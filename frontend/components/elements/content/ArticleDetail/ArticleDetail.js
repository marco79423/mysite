import React from 'react'
import styled from '@emotion/styled'
import {NextSeo} from 'next-seo'

import Article from '../../generic/Article'
import {COMMENT_CONFIG, HOST_URL} from '../../../../config'
import useCanonicalUrl from '../../../../lib/useCanonicalUrl'


const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

function ArticleDetail({article}) {
  const canonicalUrl = useCanonicalUrl(HOST_URL)

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
          commentConfig={COMMENT_CONFIG}
        />
      </Base>
    </>
  )
}

export default React.memo(ArticleDetail)
