import { call, put, select, takeLatest } from 'redux-saga/effects'

import fetchJSON from '../../../lib/fetchJSON'

import { getAPIServerUrl } from '../config/selectors'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function *fetchSiteInfoSaga () {
  const apiServerUrl = yield select(getAPIServerUrl)
  const siteInfo = yield call(fetchJSON, `${apiServerUrl}/info/`)
  yield put(actions.setSiteInfo(siteInfo))
}

export default function *saga () {
  yield takeLatest(actionTypes.FETCH_SITE_INFO, fetchSiteInfoSaga)
}