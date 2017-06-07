import { call, put, select, takeLatest } from 'redux-saga/effects'

import fetchJSON from '../../../lib/fetchJSON'

import { getAPIServerUrl } from '../config/selectors'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function *fetchArticlesSaga () {
  const apiServerUrl = yield select(getAPIServerUrl)
  const articles = yield call(fetchJSON, `${apiServerUrl}/articles/`)
  yield put(actions.setArticles(articles))
}

export default function *saga () {
  yield takeLatest(actionTypes.FETCH_ARTICLES, fetchArticlesSaga)
}
