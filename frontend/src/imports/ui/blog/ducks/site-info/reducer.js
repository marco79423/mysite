import {handleActions} from 'redux-actions'

import * as actionTypes from './actionTypes'

const defaultState = {
  repositoryVersion: '',
  siteUpdatedTime: '',
}

const reducerMap = {
  [actionTypes.SET_SITE_INFO]: (state, action) => ({
    ...state,
    ...action.payload,
  })
}

export default handleActions(reducerMap, defaultState)
