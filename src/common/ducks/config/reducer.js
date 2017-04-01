import * as Immutable from 'immutable'
import * as clientConfig from '../../../config/client'

const defaultState = Immutable.fromJS(clientConfig)

export default () => defaultState
