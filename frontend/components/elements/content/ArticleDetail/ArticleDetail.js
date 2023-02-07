import React from 'react'
import styled from '@emotion/styled'
import {NextSeo} from 'next-seo'

import Article from '../../generic/Article'
import Loading from '../../generic/Loading'
import {HOST_URL} from '../../../../config'
import useCanonicalUrl from '../../../../lib/useCanonicalUrl'
import {useSelector} from 'react-redux'
import * as articleSelectors from '../../../../redux/article/selectors'
import * as configSelectors from '../../../../redux/config/selectors'


const Base = styled.section`
  float: left;
  width: 800px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

function ArticleDetail({slug}) {
  const article = useSelector(articleSelectors.getArticle(slug))
  const commentConfig = useSelector(configSelectors.getCommentConfig)
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
          commentConfig={commentConfig}
        />
      </Base>
    </>
  )
}

export default React.memo(ArticleDetail)
