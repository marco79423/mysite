import * as config from '../../../../config'

const defaultState = {
  ...config,
  theme: require(`../../theme/default`).default
}

export default () => defaultState
