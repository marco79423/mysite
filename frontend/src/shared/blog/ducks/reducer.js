import { combineReducers } from 'redux-immutable'

import configReducer from './config/reducer'
import articleReducer from './article/reducer'
import routingReducer from './routing/reducer'
import labReducer from './lab/reducer'
import pageReducer from './page/reducer'
import siteInfoReducer from './site-info/reducer'

export default combineReducers({
  article: articleReducer,
  config: configReducer,
  lab: labReducer,
  page: pageReducer,
  routing: routingReducer,
  siteInfo: siteInfoReducer
})
