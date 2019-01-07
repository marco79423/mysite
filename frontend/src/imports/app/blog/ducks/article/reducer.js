import {handleActions} from 'redux-actions'

import * as actionTypes from './actionTypes'

const defaultState = {
  items: []
}

const reducerMap = {
  [actionTypes.SET_ARTICLES]: (state, action) => ({
    ...state,
    items: action.payload,
  })
}

export default handleActions(reducerMap, defaultState)
