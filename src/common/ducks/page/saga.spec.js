import { call, put, select } from 'redux-saga/effects'

import { getAPIServerUrl } from '../config/selectors'

import fetchJSON from '../../../lib/fetchJSON'

import * as actions from './actions'
import { fetchPagesSaga } from './saga'

describe('fetchPagesSaga', () => {
  const generator = fetchPagesSaga()

  test('should get api server url from state', () => {
    expect(generator.next().value).toEqual(select(getAPIServerUrl))
  })

  test('should fetch pages from API server', () => {
    const apiServerUrl = 'API_SERVER_URL'
    expect(generator.next(apiServerUrl).value).toEqual(call(fetchJSON, `${apiServerUrl}/web_pages/`))
  })

  test('should create action for the response', () => {
    const pages = [
      {
        'app': 'me',
        'title': '成功日記'
      },
      {
        'app': 'me',
        'title': '閱讀計劃'
      },
    ]
    expect(generator.next(pages).value).toEqual(put(actions.setPages(pages)))
  })

  test('and then finished', () => {
    expect(generator.next()).toEqual({done: true, value: undefined})
  })
})
