import 'isomorphic-fetch'
import * as Immutable from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createTracker, EventTypes } from 'redux-segment'
import createSagaMiddleware from 'redux-saga'

import reducer from './blog/ducks/reducer'

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
    history = browserHistory
  }

  const composeEnhancers = (DEBUG && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()

  const initialState = Immutable.fromJS(INITIAL_STATE)
  return {
    ...createStore(
      reducer,
      initialState,
      composeEnhancers(
        applyMiddleware(
          sagaMiddleware,
          routerMiddleware(history),
          tracker
        )
      )
    ),
    runSaga: sagaMiddleware.run
  }
}
