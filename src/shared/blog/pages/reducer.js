import { combineReducers } from 'redux-immutable'

import labReducer from '../ducks/lab/reducer'
import pageReducer from '../containers/PageContainer/reducer'
import siteInfoReducer from '../containers/SiteInfoContainer/reducer'

export default combineReducers({
  lab: labReducer,
  page: pageReducer,
  siteInfo: siteInfoReducer
})
