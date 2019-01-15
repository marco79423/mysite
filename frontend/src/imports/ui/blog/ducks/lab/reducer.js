import {handleActions} from 'redux-actions'

import * as actionTypes from './actionTypes'

const defaultState = {
  crazyMode: false
}

const reducerMap = {
  [actionTypes.SET_CRAZY_MODE]: (state, action) => ({
    ...state,
    crazyMode: action.payload,
  })
}

export default handleActions(reducerMap, defaultState)
