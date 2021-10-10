import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import ArticleDetail from '../../components/content/ArticleDetail'
import * as articleActions from '../../ducks/article/actions'
import * as articleSelectors from '../../ducks/article/selectors'
import * as configSelectors from '../../ducks/config/selectors'

export default function ArticleDetailContainer({slug}) {
  const dispatch = useDispatch()

  const siteName = useSelector(configSelectors.getSiteName)
  const article = useSelector(articleSelectors.getArticle(slug))
  const commentConfig = useSelector(configSelectors.getCommentConfig)

  React.useEffect(() => {
    if (!article) {
      dispatch(articleActions.fetchArticle(slug))
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
