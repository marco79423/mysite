import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const setArticles = createAction(actionTypes.SET_ARTICLES, articles => articles)

export function fetchArticles () {
  return function (dispatch, getState) {
    return fetch(`${getState().getIn(['config', 'API_SERVER_URL'])}/articles/`)
      .then(response => response.json())
      .then(articles => dispatch(setArticles(articles)))
  }
}
