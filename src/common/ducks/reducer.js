import { combineReducers } from 'redux-immutable'

import config from './config'
import article from './article'
import page from './page'
import routing from './routing'

export default combineReducers({
  config: config.reducer,
  article: article.reducer,
  page: page.reducer,
  routing: routing.reducer
})
