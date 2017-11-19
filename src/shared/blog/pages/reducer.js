import { combineReducers } from 'redux-immutable'

import labReducer from '../ducks/lab/reducer'
import pageReducer from '../ducks/page/reducer'
import siteInfoReducer from '../containers/SiteInfoContainer/reducer'

export default combineReducers({
  lab: labReducer,
  page: pageReducer,
  siteInfo: siteInfoReducer
})
