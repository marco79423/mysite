import { combineReducers } from 'redux-immutable'

import configReducer from './ducks/config/reducer'
import articleReducer from './ducks/article/reducer'
import routingReducer from './ducks/routing/reducer'

import scenesReducer from './pages/reducer'

export default combineReducers({
  config: configReducer,
  article: articleReducer,
  routing: routingReducer,
  scenes: scenesReducer,
})
