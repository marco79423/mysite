import { call, put, select, takeLatest } from 'redux-saga/effects'

import fetchJSON from '../../../lib/fetchJSON'

import { getBackendServerUrl } from '../config/selectors'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function *fetchPagesSaga () {
  const backendServerUrl = yield select(getBackendServerUrl)
  const pages = yield call(fetchJSON, `${backendServerUrl}/api/web_pages/`)
  yield put(actions.setPages(pages))
}

export default function *saga () {
  yield takeLatest(actionTypes.FETCH_PAGES, fetchPagesSaga)
}
