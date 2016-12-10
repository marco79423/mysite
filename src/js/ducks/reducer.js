import { combineReducers } from 'redux-immutable';

import main from './main';
import articles from './articles';
import routing from './routing';


export default combineReducers({
    main: main.reducer,
    articles: articles.reducer,
    routing: routing.reducer
});
