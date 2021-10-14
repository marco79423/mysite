import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const fetchArticles = createAction(actionTypes.FETCH_ARTICLES)
export const fetchArticle = createAction(actionTypes.FETCH_ARTICLE)

export const setArticles = createAction(actionTypes.SET_ARTICLES, articles => articles)
export const setArticle = createAction(actionTypes.SET_ARTICLE, article => article)
