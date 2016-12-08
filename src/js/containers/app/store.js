import * as Immutable from 'immutable';
import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import reducer from '../../ducks/reducer';


const stateTransformer = (state) => {
    if (Immutable.Iterable.isIterable(state)) return state.toJS();
    else return state;
};

const initialState = Immutable.Map();
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
        createLogger({ stateTransformer }),
        thunk,
        routerMiddleware(browserHistory)
    )
);

export default store;
