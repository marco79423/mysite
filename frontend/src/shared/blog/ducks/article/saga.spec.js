import { call, put, select } from 'redux-saga/effects'

import fetchJSON from '../../../../lib/fetchJSON'

import * as actions from './actions'
import { fetchArticlesSaga } from './saga'

describe('fetchArticlesSaga', () => {
  const generator = fetchArticlesSaga()

  test('should fetch articles from backend server', () => {
    expect(generator.next().value).toEqual(call(fetchJSON, '/api/articles/'))
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
