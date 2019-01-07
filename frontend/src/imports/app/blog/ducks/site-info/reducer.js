import * as Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as actionTypes from './actionTypes'

const defaultState = Immutable.fromJS({
  repositoryVersion: '',
  siteUpdatedTime: '',
})

const reducerMap = {
  [actionTypes.SET_SITE_INFO]: (state, action) => state.merge(Immutable.fromJS(action.payload))
}

export default handleActions(reducerMap, defaultState)
