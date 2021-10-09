import {combineReducers} from 'redux'

import configReducer from './config/reducer'
import articleReducer from './article/reducer'
import routerReducer from './router/reducer'

export default combineReducers({
  article: articleReducer,
  config: configReducer,
  router: routerReducer,
})
