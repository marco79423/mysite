import * as Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import * as actionTypes from './actionTypes'

const defaultState = Immutable.fromJS({
  crazyMode: false
})

const reducerMap = {
  [actionTypes.SET_CRAZY_MODE]: (state, action) => state.update('crazyMode', crazyMode => action.payload)
}

export default handleActions(reducerMap, defaultState)
