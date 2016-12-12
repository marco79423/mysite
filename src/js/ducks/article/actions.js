import moment from 'moment';
import { createAction } from 'redux-actions';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

import * as config from '../../config';


export const setArticles = createAction('SET_ARTICLES', articles => articles);


export function fetchArticles() {
    return function (dispatch) {
        return fetch(`${config.API_SERVER_URL}/articles/`)
            .then(response => response.json())
            .then(articles => articles.map(article => ({
                ...article,
                date: moment(article.date),
                modifiedDate: article.modifiedDate ? moment(article.modifiedDate) : null
            })))
            .then(articles => reverse(sortBy(articles, 'date')))
            .then(articles => dispatch(setArticles(articles)));
    };
}
