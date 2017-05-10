import 'isomorphic-fetch'

import * as Immutable from 'immutable'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actionTypes from './actionTypes'
import * as actions from './actions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const siteInfo = {
  'version': 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
}

test('setSiteInfo should create an action to set articles', () => {
  const expectedAction = {
    type: actionTypes.SET_SITE_INFO,
    payload: siteInfo
  }
  expect(actions.setSiteInfo(siteInfo)).toEqual(expectedAction)
})

test('fetchSiteInfo should create an action to fetch site info for api server', done => {
  const store = mockStore(Immutable.fromJS({
    config: {
      API_SERVER_URL: 'https://api.marco79423.net/api'
    }
  }))

  const expectedActions = [
    {
      type: actionTypes.SET_SITE_INFO,
      payload: siteInfo
    }
  ]

  fetchMock.once('https://api.marco79423.net/api/info/', siteInfo)
  store.dispatch(actions.fetchSiteInfo())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
})
