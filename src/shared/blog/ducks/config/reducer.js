import * as Immutable from 'immutable'
import * as sharedConfig from '../../../../config/shared'

const defaultState = Immutable.fromJS({
  ...sharedConfig,
  theme: require(`../../theme/default`).default
})

export default () => defaultState
