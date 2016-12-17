import * as Immutable from 'immutable';
import {handleActions} from 'redux-actions';
import * as config from '../../config';


const defaultState = Immutable.fromJS(config);

const reducerMap = {
  LOAD_CONFIG: () => Immutable.fromJS(config)
};

export default handleActions(reducerMap, defaultState);
