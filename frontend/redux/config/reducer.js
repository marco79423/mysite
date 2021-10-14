import * as config from '../../config'
import {HYDRATE} from 'next-redux-wrapper'
import {handleActions} from 'redux-actions'

const defaultState = {
  ...config,
  theme: require('../../components/theme/default').default
}


const reducerMap = {
  [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload.config,
    }
  },
}

export default handleActions(reducerMap, defaultState)
