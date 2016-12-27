import * as Immutable from 'immutable'
import {applyMiddleware, createStore} from 'redux'
import {browserHistory} from 'react-router'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'

import reducer from '../../ducks/reducer'


let middlewares = [
  thunk,
  routerMiddleware(browserHistory)
]

if(process.env.DEBUG) {
  const stateTransformer = (state) => {
    if (Immutable.Iterable.isIterable(state)) {
      return state.toJS()
    }
    return state
  }
  middlewares = [createLogger({stateTransformer}), ...middlewares]
}

const initialState = Immutable.Map()
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
)

export default store
