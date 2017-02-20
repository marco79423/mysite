import _ from 'lodash'

export const getPathName = (state) => _.get(state.getIn(['routing', 'locationBeforeTransitions']), 'pathname') || '/'

