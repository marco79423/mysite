import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import {createMiddleware} from 'redux-beacon'
import GoogleAnalyticsGtag from '@redux-beacon/google-analytics-gtag'

import reducer from './blog/ducks/reducer'
import {history} from './blog/ducks/router/reducer'
import {GTAG_TRACKER_ID} from '../config'
import {eventsMap} from './gtagEvents'

const isDevelopment = process.env.NODE_ENV === 'development'

export function configureStore(preloadState) {

  const composeEnhancers = (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()
  const gaMiddleware = createMiddleware(eventsMap, GoogleAnalyticsGtag(GTAG_TRACKER_ID))

  return {
    ...createStore(
      reducer,
      preloadState,
      composeEnhancers(
        applyMiddleware(
          gaMiddleware,
          sagaMiddleware,
          routerMiddleware(history),
        )
      )
    ),
    history: history,
    runSaga: sagaMiddleware.run
  }
}
