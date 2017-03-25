import {createAction} from 'redux-actions'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'

import * as actionTypes from './actionTypes'


export const setArticles = createAction(actionTypes.SET_ARTICLES, articles => articles)


export function fetchArticles() {
  return function (dispatch, getState) {
    return fetch(`${getState().getIn(['config', 'API_SERVER_URL'])}/articles/`)
      .then(response => response.json())
      .then(articles => reverse(sortBy(articles, 'date')))
      .then(articles => dispatch(setArticles(articles)))
  }
}
