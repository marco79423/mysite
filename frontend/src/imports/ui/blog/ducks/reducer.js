import { combineReducers } from 'redux'

import configReducer from './config/reducer'
import articleReducer from './article/reducer'
import routerReducer from './router/reducer'
import labReducer from './lab/reducer'
import pageReducer from './page/reducer'
import siteInfoReducer from './site-info/reducer'

export default combineReducers({
  article: articleReducer,
  config: configReducer,
  lab: labReducer,
  page: pageReducer,
  router: routerReducer,
  siteInfo: siteInfoReducer
})
