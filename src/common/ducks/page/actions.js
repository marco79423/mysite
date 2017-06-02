import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const fetchPages = createAction(actionTypes.FETCH_PAGES)
export const setPages = createAction(actionTypes.SET_PAGES, pages => pages)
