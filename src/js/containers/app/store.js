import * as Immutable from 'immutable';
import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import reducer from '../../ducks/reducer';


const stateTransformer = (state) => {
  if (Immutable.Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const store = createStore(reducer, applyMiddleware(
  createLogger({ stateTransformer }),
  routerMiddleware(browserHistory)
));

export default store;
