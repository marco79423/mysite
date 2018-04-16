import { call, put, select, takeLatest } from 'redux-saga/effects'

import fetchJSON from '../../../../lib/fetchJSON'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function *fetchArticlesSaga () {
  const articles = yield call(fetchJSON, '/api/articles/')
  yield put(actions.setArticles(articles))
}

export default function *saga () {
  yield takeLatest(actionTypes.FETCH_ARTICLES, fetchArticlesSaga)
}
