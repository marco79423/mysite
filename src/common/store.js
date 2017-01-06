import 'isomorphic-fetch';
import * as Immutable from 'immutable'
import {applyMiddleware, createStore} from 'redux'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './ducks/reducer'

const INITIAL_STATE = (typeof window !== 'undefined') ? window.__PRELOADED_STATE__ : {}
const DEBUG = process.env.DEBUG

const stateTransformer = (state) => {
  if (Immutable.Iterable.isIterable(state)) {
    return state.toJS()
  }
  return state
}

export function configureStore(history = browserHistory) {
  let middleware = [
    thunk,
    routerMiddleware(history)
  ]

  if (DEBUG) {
    middleware = [createLogger({stateTransformer}), ...middleware]
  }

  const initialState = Immutable.fromJS(INITIAL_STATE)
  return createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  )
}
