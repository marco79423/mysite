import * as Immutable from 'immutable'

import * as actions from './actions'
import reducer from './reducer'

test('article reducer return a state with new site info', () => {
  const state = Immutable.fromJS({
    version: ''
  })
  const action = actions.setSiteInfo({
    version: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
  })
  const expectedNextState = Immutable.fromJS({
    version: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
  })

  expect(reducer(state, action)).toEqual(expectedNextState)
})
