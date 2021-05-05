import {call, put, select, takeLatest} from 'redux-saga/effects'

import fetchJSON from '../../../../lib/fetchJSON'

import {getBackendServerUrl} from '../config/selectors'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function* fetchArticlesSaga() {
  const backendServerUrl = yield select(getBackendServerUrl)
  const response = yield call(fetchJSON, `${backendServerUrl}/api/articles/`)
  const articles = response.data
  yield put(actions.setArticles(articles))
}

export function* fetchArticleSaga(action) {
  const articleSlug = action.payload
  const backendServerUrl = yield select(getBackendServerUrl)
  const response = yield call(fetchJSON, `${backendServerUrl}/api/articles/${articleSlug}`)
  const article = response.data
  yield put(actions.setArticle(article))
}


export default function* saga() {
  yield takeLatest(actionTypes.FETCH_ARTICLES, fetchArticlesSaga)
  yield takeLatest(actionTypes.FETCH_ARTICLE, fetchArticleSaga)
}
