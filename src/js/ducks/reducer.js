import {combineReducers} from 'redux-immutable'

import main from './main'
import config from './config'
import article from './article'
import page from './page'
import routing from './routing'


export default combineReducers({
  main: main.reducer,
  config: config.reducer,
  article: article.reducer,
  page: page.reducer,
  routing: routing.reducer
})
