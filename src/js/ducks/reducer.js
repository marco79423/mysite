import { combineReducers } from 'redux-immutable';

import main from './main';
import posts from './posts';
import routing from './routing';


export default combineReducers({
    main: main.reducer,
    posts: posts.reducer,
    routing: routing.reducer
});
