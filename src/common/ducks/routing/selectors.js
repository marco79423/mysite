import _ from 'lodash'
import {createSelector} from 'reselect'

import * as configSelectors from '../config/selectors'

export const getPathName = (state) => _.get(state.getIn(['routing', 'locationBeforeTransitions']), 'pathname') || '/'
export const getCurrentUrl = createSelector(
  [
    configSelectors.getHostUrl,
    getPathName
  ],
  (hostUrl, pathName) => `${hostUrl}${pathName}`
)
