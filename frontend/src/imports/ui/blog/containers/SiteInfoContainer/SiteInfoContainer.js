import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'

import * as actions from '../../ducks/site-info/actions'
import * as siteInfoSelectors from '../../ducks/site-info/selectors'
import SiteInfo from '../../components/content/SiteInfo'

export default function SiteInfoContainer() {
  const dispatch = useDispatch()
  const repositoryVersion = useSelector(siteInfoSelectors.getRepositoryVersion)
  const updatedTime = useSelector(siteInfoSelectors.getSiteUpdatedTime)

  useEffect(() => {
    dispatch(actions.fetchSiteInfo())
  }, [dispatch])

  return (
    <SiteInfo
      repositoryVersion={repositoryVersion}
      updatedTime={updatedTime}
    />
  )
}

SiteInfoContainer.propTypes = {
  repositoryVersion: PropTypes.string.isRequired,
  updatedTime: PropTypes.string.isRequired
}
