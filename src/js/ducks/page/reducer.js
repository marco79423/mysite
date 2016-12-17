import * as Immutable from 'immutable';
import {handleActions} from 'redux-actions';


const defaultState = Immutable.fromJS({
  items: []
});

const reducerMap = {
  SET_PAGES: (state, action) => state.set('items', Immutable.fromJS(action.payload))
};

export default handleActions(reducerMap, defaultState);
