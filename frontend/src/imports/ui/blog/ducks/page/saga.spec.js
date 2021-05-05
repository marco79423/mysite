import {call, put, select} from 'redux-saga/effects'

import {getBackendServerUrl} from '../config/selectors'

import fetchJSON from '../../../../lib/fetchJSON'

import * as actions from './actions'
import {fetchPagesSaga} from './saga'

describe('fetchPagesSaga', () => {
  const generator = fetchPagesSaga()

  test('should get backend server url from state', () => {
    expect(generator.next().value).toEqual(select(getBackendServerUrl))
  })

  test('should fetch pages from backend server', () => {
    const backendServerUrl = 'BACKEND_SERVER_URL'
    expect(generator.next(backendServerUrl).value).toEqual(call(fetchJSON, `${backendServerUrl}/api/web_pages/`))
  })

  test('should create action for the response', () => {
    const response = {
      data: [
        {
          'app': 'me',
          'title': '成功日記'
        },
        {
          'app': 'me',
          'title': '閱讀計劃'
        },
      ]
    }
    expect(generator.next(response).value).toEqual(put(actions.setPages(response.data)))
  })

  test('and then finished', () => {
    expect(generator.next()).toEqual({done: true, value: undefined})
  })
})
