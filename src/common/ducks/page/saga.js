import { call, put, select, takeLatest } from 'redux-saga/effects'

import { fetchJSON } from '../../../lib/fetchHelpers'

import { getAPIServerUrl } from '../config/selectors'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function *fetchPagesSaga () {
  const apiServerUrl = yield select(getAPIServerUrl)
  const pages = yield call(fetchJSON, `${apiServerUrl}/web_pages/`)
  yield put(actions.setPages(pages))
}

export default function *saga () {
  yield takeLatest(actionTypes.FETCH_PAGES, fetchPagesSaga)
}
