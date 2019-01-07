import 'isomorphic-fetch'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import {createTracker, EventTypes} from 'redux-segment'
import createSagaMiddleware from 'redux-saga'

import reducer from './blog/ducks/reducer'

const DEBUG = process.env.DEBUG

const customMapper = {
  mapper: {
    '@@router/LOCATION_CHANGE': EventTypes.page
  }
}

const tracker = createTracker(customMapper)

export function configureStore(history) {
  const composeEnhancers = (DEBUG && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()

  return {
    ...createStore(
      reducer,
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
