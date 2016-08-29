import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import main from './main';


export default combineReducers({
    main: main.reducer,
    routing: routerReducer
});