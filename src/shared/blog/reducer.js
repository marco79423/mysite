import { combineReducers } from 'redux-immutable'

import configReducer from './ducks/config/reducer'
import articleReducer from './ducks/article/reducer'
import routingReducer from './ducks/routing/reducer'
import labReducer from './ducks/lab/reducer'
import pageReducer from './ducks/page/reducer'
import siteInfoReducer from './ducks/site-info/reducer'

export default combineReducers({
  article: articleReducer,
  config: configReducer,
  lab: labReducer,
  page: pageReducer,
  routing: routingReducer,
  siteInfo: siteInfoReducer
})
