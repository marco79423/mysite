import { call, put, select } from 'redux-saga/effects'

import { getBackendServerUrl } from '../config/selectors'

import fetchJSON from '../../../lib/fetchJSON'

import * as actions from './actions'
import { fetchArticlesSaga } from './saga'

describe('fetchArticlesSaga', () => {
  const generator = fetchArticlesSaga()

  test('should get backend server url from state', () => {
    expect(generator.next().value).toEqual(select(getBackendServerUrl))
  })

  test('should fetch articles from backend server', () => {
    const backendServerUrl = 'BACKEND_SERVER_URL'
    expect(generator.next(backendServerUrl).value).toEqual(call(fetchJSON, `${backendServerUrl}/api/articles/`))
  })

  test('should create action for the response', () => {
    const articles = [
      {
        'title': '美女最變態',
        'date': '2013-02-02T00:00:00'
      },
      {
        'title': '小雞跳樓梯',
        'date': '2013-02-18T00:00:00',
      },
      {
        'title': '擁抱',
        'date': '2013-02-16T00:00:00',
      }
    ]
    expect(generator.next(articles).value).toEqual(put(actions.setArticles(articles)))
  })

  test('and then finished', () => {
    expect(generator.next()).toEqual({done: true, value: undefined})
  })
})
