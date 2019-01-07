import 'isomorphic-fetch'

import * as actionTypes from './actionTypes'
import * as actions from './actions'

test('fetchArticles should create an action to fetch articles', () => {
  const expectedAction = {
    type: actionTypes.FETCH_ARTICLES
  }
  expect(actions.fetchArticles()).toEqual(expectedAction)
})

test('setArticles should create an action to set articles', () => {
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

  const expectedAction = {
    type: actionTypes.SET_ARTICLES,
    payload: articles
  }
  expect(actions.setArticles(articles)).toEqual(expectedAction)
})
