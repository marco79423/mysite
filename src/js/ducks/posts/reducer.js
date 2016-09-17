import * as Immutable from 'immutable';
import { handleActions } from 'redux-actions';


const defaultState = Immutable.fromJS({
    posts: [
        {
            id: 1,
            title: 'title',
            content: 'content'
        }
    ]
});

const reducerMap = {

};

export default handleActions(reducerMap, defaultState);
