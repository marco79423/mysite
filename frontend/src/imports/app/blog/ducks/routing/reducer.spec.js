import { LOCATION_CHANGE } from 'react-router-redux'

import reducer from './reducer'

test('routing reducer return a state with locationBeforeTransitions information', () => {
  const state = {
    locationBeforeTransitions: null
  }
  const action = {
    type: LOCATION_CHANGE,
    payload: {
      pathname: '/pathname'
    }
  }
  const expectedNextState = {
    locationBeforeTransitions: {
      pathname: '/pathname'
    }
  }

  expect(reducer(state, action)).toEqual(expectedNextState)
})
