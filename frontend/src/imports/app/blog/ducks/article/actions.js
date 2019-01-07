import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const fetchArticles = createAction(actionTypes.FETCH_ARTICLES)
export const setArticles = createAction(actionTypes.SET_ARTICLES, articles => articles)
