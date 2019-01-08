import * as actions from './actions'
import reducer from './reducer'

test('page reducer return a state with new pages', () => {
  const state = {
    items: []
  }
  const action = actions.setPages([
    'page 1', 'page 2'
  ])
  const expectedNextState = {
    items: ['page 1', 'page 2']
  }

  expect(reducer(state, action)).toEqual(expectedNextState)
})
