import { call, put, select } from 'redux-saga/effects'

import fetchJSON from '../../../../lib/fetchJSON'

import * as actions from './actions'
import { fetchSiteInfoSaga } from './saga'

describe('fetchSiteInfoSaga', () => {
  const generator = fetchSiteInfoSaga()

  test('should fetch site info from backend server', () => {
    expect(generator.next().value).toEqual(call(fetchJSON, '/api/info/'))
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
