import { combineReducers } from 'redux-immutable'

import labReducer from '../containers/LabContainer/reducer'
import pageReducer from './page/reducer'
import siteInfoReducer from '../containers/SiteInfoContainer/reducer'

export default combineReducers({
  lab: labReducer,
  page: pageReducer,
  siteInfo: siteInfoReducer
})
