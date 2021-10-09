import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import ArticleDetail from '../../components/content/ArticleDetail'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

export default function ArticleDetailContainer({match}) {
  const dispatch = useDispatch()

  const siteName = useSelector(configSelectors.getSiteName)
  const article = useSelector(articleSelectors.getArticle(match.params.slug))
  const commentConfig = useSelector(configSelectors.getCommentConfig)

  const fetchArticle = (slug) => dispatch(articleActions.fetchArticle(slug))

  React.useEffect(() => {
    if (!article) {
      fetchArticle(match.params.slug)
    }
  }, [article])

  return (
    <ArticleDetail
      siteName={siteName}
      article={article}
      commentConfig={commentConfig}
    />
  )
}
