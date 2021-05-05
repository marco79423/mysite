import {handleActions} from 'redux-actions'

import * as actionTypes from './actionTypes'

const defaultState = {
  slugs: [],
  items: {}
}

const reducerMap = {
  [actionTypes.SET_ARTICLES]: (state, action) => ({
    ...state,
    slugs: action.payload.map(article => article.slug),
    items: action.payload.reduce((items, article) => ({
      ...items,
      [article.slug]: article
    }), state.items),
  }),
  [actionTypes.SET_ARTICLE]: (state, action) => ({
    ...state,
    items: {
      ...state.items,
      [action.payload.slug]: action.payload
    },
  })
}

export default handleActions(reducerMap, defaultState)
