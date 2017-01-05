import * as Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as actionTypes from './actionTypes'


const defaultState = Immutable.fromJS({
  value: 0
})

const reducerMap = {
  [actionTypes.ADD_VALUE]: state => state.update('value', value => value + 1)
}

export default handleActions(reducerMap, defaultState)
