import { combineReducers } from 'redux-immutable';

import main from './main';
import article from './article';
import routing from './routing';


export default combineReducers({
    main: main.reducer,
    article: article.reducer,
    routing: routing.reducer
});
