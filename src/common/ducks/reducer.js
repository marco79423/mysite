import { combineReducers } from 'redux-immutable'

import configReducer from './config/reducer'
import articleReducer from './article/reducer'
import labReducer from './lab/reducer'
import pageReducer from './page/reducer'
import routingReducer from './routing/reducer'
import siteInfoReducer from './site-info/reducer'

export default combineReducers({
  config: configReducer,
  article: articleReducer,
  lab: labReducer,
  page: pageReducer,
  routing: routingReducer,
  siteInfo: siteInfoReducer
})
