import * as Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as actionTypes from './actionTypes'

const defaultState = Immutable.fromJS({
  items: []
})

const reducerMap = {
  [actionTypes.SET_PAGES]: (state, action) => state.set('items', Immutable.fromJS(action.payload))
}

export default handleActions(reducerMap, defaultState)
