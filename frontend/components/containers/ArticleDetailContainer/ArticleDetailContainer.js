import React from 'react'
import {useSelector} from 'react-redux'

import * as articleSelectors from '../../../redux/article/selectors'
import * as configSelectors from '../../../redux/config/selectors'
import ArticleDetail from '../../elements/content/ArticleDetail'

export default function ArticleDetailContainer({slug}) {
  const article = useSelector(articleSelectors.getArticle(slug))
  const commentConfig = useSelector(configSelectors.getCommentConfig)

  return (
    <ArticleDetail
      article={article}
      commentConfig={commentConfig}
    />
  )
}
