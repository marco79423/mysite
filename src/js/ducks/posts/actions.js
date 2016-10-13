import { createAction } from 'redux-actions';

import * as config from '../../config';


export const setPosts = createAction('SET_POSTS', posts => posts);


export function fetchPosts() {
    return function (dispatch) {
        return fetch(`${config.apiServerUrl}/posts/`)
            .then(response => response.json())
            .then(posts => dispatch(setPosts(posts)));
    };
}
