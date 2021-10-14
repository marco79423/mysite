import {applyMiddleware, compose, createStore} from 'redux'
import {createWrapper} from 'next-redux-wrapper'

import reducer from './reducer'

const isDevelopment = process.env.NODE_ENV === 'development'

function makeStore() {
  const composeEnhancers = (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware()
    )
  )
}

// export const wrapper = createWrapper(makeStore, {debug: true})
export const wrapper = createWrapper(makeStore, {debug: false})
