import 'isomorphic-fetch'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import reducer from './blog/ducks/reducer'
import {history} from './blog/ducks/router/reducer'

const isDevelopment = process.env.NODE_ENV === 'development'

export function configureStore(preloadState) {

  const composeEnhancers = (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()

  return {
    ...createStore(
      reducer,
      preloadState,
      composeEnhancers(
        applyMiddleware(
          sagaMiddleware,
          routerMiddleware(history),
        )
      )
    ),
    history: history,
    runSaga: sagaMiddleware.run
  }
}
