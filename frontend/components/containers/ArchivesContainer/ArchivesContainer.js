import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as articleActions from '../../../redux/article/actions'
import * as articleSelectors from '../../../redux/article/selectors'
import Archives from '../../elements/content/Archives'


export default function ArchivesContainer() {
  const dispatch = useDispatch()
  const articles = useSelector(articleSelectors.getArticles)

  React.useEffect(() => {
    if (articles.length === 0) {
      dispatch(articleActions.fetchArticles())
    }
  }, [articles])

  return (
    <Archives articles={articles}/>
  )
}
