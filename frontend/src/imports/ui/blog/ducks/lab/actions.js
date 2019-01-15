import { createAction } from 'redux-actions'

import * as actionTypes from './actionTypes'

export const setCrazyMode = createAction(actionTypes.SET_CRAZY_MODE, crazyMode => crazyMode)
