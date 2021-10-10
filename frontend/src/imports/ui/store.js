import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createMiddleware} from 'redux-beacon'
import GoogleAnalyticsGtag from '@redux-beacon/google-analytics-gtag'
import {createWrapper} from 'next-redux-wrapper'

import reducer from './blog/ducks/reducer'
import {GTAG_TRACKER_ID} from '../config'
import {eventsMap} from './gtagEvents'
import saga from './blog/ducks/saga'

const isDevelopment = process.env.NODE_ENV === 'development'

function makeStore() {

  const composeEnhancers = (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()
  const gaMiddleware = createMiddleware(eventsMap, GoogleAnalyticsGtag(GTAG_TRACKER_ID))

  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(
        gaMiddleware,
        sagaMiddleware,
      )
    )
  )

  store.sagaTask = sagaMiddleware.run(saga)

  return store
}

export const wrapper = createWrapper(makeStore, {debug: true})
