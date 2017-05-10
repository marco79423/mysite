import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const setSiteInfo = createAction(actionTypes.SET_SITE_INFO, siteInfo => siteInfo)

export function fetchSiteInfo () {
  return function (dispatch, getState) {
    return fetch(`${getState().getIn(['config', 'API_SERVER_URL'])}/info/`)
      .then(response => response.json())
      .then(siteInfo => dispatch(setSiteInfo(siteInfo)))
  }
}
