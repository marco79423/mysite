import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const fetchSiteInfo = createAction(actionTypes.FETCH_SITE_INFO)
export const setSiteInfo = createAction(actionTypes.SET_SITE_INFO, siteInfo => siteInfo)
