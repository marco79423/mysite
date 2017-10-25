import get from 'lodash/get'
import { createSelector } from 'reselect'

import * as configSelectors from '../config/selectors'

export const getPathName = (state) => get(state.getIn(['routing', 'locationBeforeTransitions']), 'pathname') || '/'
export const getCurrentUrl = createSelector(
  [
    configSelectors.getHostUrl,
    getPathName
  ],
  (hostUrl, pathName) => `${hostUrl}${pathName}`
)
