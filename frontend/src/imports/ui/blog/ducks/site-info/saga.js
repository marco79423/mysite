import {call, put, select, takeLatest} from 'redux-saga/effects'

import fetchJSON from '../../../../lib/fetchJSON'

import {getBackendServerUrl} from '../config/selectors'

import * as actions from './actions'
import * as actionTypes from './actionTypes'

export function* fetchSiteInfoSaga() {
  const backendServerUrl = yield select(getBackendServerUrl)
  const response = yield call(fetchJSON, `${backendServerUrl}/api/info/`)
  const siteInfo = response.data
  yield put(actions.setSiteInfo(siteInfo))
}

export default function* saga() {
  yield takeLatest(actionTypes.FETCH_SITE_INFO, fetchSiteInfoSaga)
}
