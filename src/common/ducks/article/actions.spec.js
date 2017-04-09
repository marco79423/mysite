import 'isomorphic-fetch'

import * as Immutable from 'immutable'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actionTypes from './actionTypes'
import * as actions from './actions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

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

const sortedArticles = [
  {
    'title': '小雞跳樓梯',
    'date': '2013-02-18T00:00:00',
  },
  {
    'title': '擁抱',
    'date': '2013-02-16T00:00:00',
  },
  {
    'title': '美女最變態',
    'date': '2013-02-02T00:00:00'
  }
]

test('setArticles should create an action to set articles', () => {
  const expectedAction = {
    type: actionTypes.SET_ARTICLES,
    payload: articles
  }
  expect(actions.setArticles(articles)).toEqual(expectedAction)
})

test('fetchArticles should create an action to fetch articles for api server', done => {
  const store = mockStore(Immutable.fromJS({
    config: {
      API_SERVER_URL: 'https://api.marco79423.net'
    }
  }))

  const expectedActions = [
    {
      type: actionTypes.SET_ARTICLES,
      payload: sortedArticles
    }
  ]

  fetchMock.once('https://api.marco79423.net/articles/', articles)
  store.dispatch(actions.fetchArticles())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
})
