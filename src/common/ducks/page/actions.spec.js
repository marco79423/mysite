import 'isomorphic-fetch'

import * as Immutable from 'immutable'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actionTypes from './actionTypes'
import * as actions from './actions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

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

test('setPages should create an action to set pages', () => {
  const expectedAction = {
    type: actionTypes.SET_PAGES,
    payload: pages
  }
  expect(actions.setPages(pages)).toEqual(expectedAction)
})

test('fetchPages should create an action to fetch pages for api server', done => {
  const store = mockStore(Immutable.fromJS({
    config: {
      API_SERVER_URL: 'https://api.marco79423.net'
    }
  }))

  const expectedActions = [
    {
      type: actionTypes.SET_PAGES,
      payload: pages
    }
  ]

  fetchMock.once('https://api.marco79423.net/web_pages/', pages)
  store.dispatch(actions.fetchPages())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
})
