import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const setPages = createAction(actionTypes.SET_PAGES, pages => pages)

export function fetchPages () {
  return function (dispatch, getState) {
    return fetch(`${getState().getIn(['config', 'API_SERVER_URL'])}/web_pages/`)
      .then(response => response.json())
      .then(pages => dispatch(setPages(pages)))
  }
}
