import * as sharedConfig from '../../../../config/shared'

const defaultState = {
  ...sharedConfig,
  theme: require(`../../theme/default`).default
}

export default () => defaultState
