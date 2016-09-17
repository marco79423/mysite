import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import main from './main';
import posts from './posts';


export default combineReducers({
    main: main.reducer,
    posts: posts.reducer,
    routing: routerReducer
});
