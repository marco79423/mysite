import { combineReducers } from 'redux-immutable'

import labReducer from '../containers/Lab/reducer'
import pageReducer from './page/reducer'
import siteInfoReducer from './site-info/reducer'

export default combineReducers({
  lab: labReducer,
  page: pageReducer,
  siteInfo: siteInfoReducer
})
