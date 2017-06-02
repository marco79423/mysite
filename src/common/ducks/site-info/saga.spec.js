import { call, put, select } from 'redux-saga/effects'

import { getAPIServerUrl } from '../config/selectors'

import { fetchJSON } from '../../../lib/fetchHelpers'

import * as actions from './actions'
import { fetchSiteInfoSaga } from './saga'

describe('fetchSiteInfoSaga', () => {
  const generator = fetchSiteInfoSaga()

  test('should get api server url from state', () => {
    expect(generator.next().value).toEqual(select(getAPIServerUrl))
  })

  test('should fetch site info from API server', () => {
    const apiServerUrl = 'API_SERVER_URL'
    expect(generator.next(apiServerUrl).value).toEqual(call(fetchJSON, `${apiServerUrl}/info/`))
  })

  test('should create action for the response', () => {
    const response = {
      version: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
    }
    expect(generator.next(response).value).toEqual(put(actions.setSiteInfo(response)))
  })

  test('and then finished', () => {
    expect(generator.next()).toEqual({done: true, value: undefined})
  })
})
