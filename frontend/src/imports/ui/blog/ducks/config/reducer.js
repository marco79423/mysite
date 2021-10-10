import * as config from '../../../../config'
import {HYDRATE} from 'next-redux-wrapper'
import {handleActions} from 'redux-actions'
import * as actionTypes from '../article/actionTypes'

const defaultState = {
  ...config,
  theme: require(`../../theme/default`).default
}


const reducerMap = {
  [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload.some,
    }
  },
}

export default handleActions(reducerMap, defaultState)
