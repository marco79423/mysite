import {createSelector} from 'reselect'

import * as configSelectors from '../config/selectors'

export const getPathName = (state) => state.router.location.pathname
export const getCurrentUrl = createSelector(
  [
    configSelectors.getHostUrl,
    getPathName
  ],
  (hostUrl, pathName) => `${hostUrl}${pathName}`
)
