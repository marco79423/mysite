import 'isomorphic-fetch'
import * as Immutable from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createTracker, EventTypes } from 'redux-segment'

import reducer from './ducks/reducer'

const INITIAL_STATE = (typeof window !== 'undefined') ? window.__PRELOADED_STATE__ : {}
const DEBUG = process.env.DEBUG

const customMapper = {
  mapper: {
    '@@router/LOCATION_CHANGE': EventTypes.page
  }
}

const tracker = createTracker(customMapper)

export function configureStore (history) {
  if (!history) {
    history = createHistory()
  }

  const composeEnhancers = (DEBUG && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const initialState = Immutable.fromJS(INITIAL_STATE)
  return createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
        tracker
      )
    )
  )
}
