import { call, put, select } from 'redux-saga/effects'

import fetchJSON from '../../../../lib/fetchJSON'

import * as actions from './actions'
import { fetchPagesSaga } from './saga'

describe('fetchPagesSaga', () => {
  const generator = fetchPagesSaga()

  test('should fetch pages from backend server', () => {
    expect(generator.next().value).toEqual(call(fetchJSON, '/api/web_pages/'))
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
