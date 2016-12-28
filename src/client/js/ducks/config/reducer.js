import * as Immutable from 'immutable'
import * as settings from './settings'


const defaultState = Immutable.fromJS(settings)


export default () => defaultState
