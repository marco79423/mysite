import { call, put, select, takeLatest } from 'redux-saga/effects'

import fetchJSON from '../../../../lib/fetchJSON'

import { getBackendServerUrl } from '../config/selectors'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function *fetchArticlesSaga () {
  const backendServerUrl = yield select(getBackendServerUrl)
  const articles = yield call(fetchJSON, `${backendServerUrl}/api/articles/`)
  yield put(actions.setArticles(articles))
}

export default function *saga () {
  yield takeLatest(actionTypes.FETCH_ARTICLES, fetchArticlesSaga)
}
