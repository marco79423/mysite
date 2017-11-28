import * as Immutable from 'immutable'
import * as sharedConfig from '../../../../config/shared'

const defaultState = Immutable.fromJS(sharedConfig)

export default () => defaultState
