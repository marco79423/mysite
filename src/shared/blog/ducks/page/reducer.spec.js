import * as Immutable from 'immutable'

import * as actions from './actions'
import reducer from './reducer'

test('page reducer return a state with new pages', () => {
  const state = Immutable.fromJS({
    items: []
  })
  const action = actions.setPages([
    'page 1', 'page 2'
  ])
  const expectedNextState = Immutable.fromJS({
    items: ['page 1', 'page 2']
  })

  expect(reducer(state, action)).toEqual(expectedNextState)
})
