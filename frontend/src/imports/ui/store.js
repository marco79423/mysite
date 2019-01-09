import 'isomorphic-fetch'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './blog/ducks/reducer'

const DEBUG = process.env.REACT_APP_DEBUG

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
        )
      )
    ),
    runSaga: sagaMiddleware.run
  }
}
