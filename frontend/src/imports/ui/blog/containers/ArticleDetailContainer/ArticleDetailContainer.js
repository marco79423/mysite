import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'

import ArticleDetail from '../../components/content/ArticleDetail'

import * as siteSelectors from '../../ducks/site/selectors'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

export default function ArticleDetailContainer({match}) {
  const dispatch = useDispatch()

  const siteConfig = useSelector(siteSelectors.getArticleSiteHeadConfig(match.params.slug))
  const article = useSelector(articleSelectors.getArticle(match.params.slug))
  const socialConfig = useSelector(articleSelectors.getSocialConfig)
  const commentConfig =  useSelector(configSelectors.getCommentConfig)

  const fetchArticle = (slug) => dispatch(articleActions.fetchArticle(slug))

  React.useEffect(() => {
    if(!article) {
      fetchArticle(match.params.slug)
    }
  }, [article])

  return (
      <ArticleDetail
        siteConfig={siteConfig}
        summaryMode={false}
        article={article}
        socialConfig={socialConfig}
        commentConfig={commentConfig}
      />
    )
}
