import * as Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

import reducer from './reducer'

test('routing reducer return a state with locationBeforeTransitions information', () => {
  const state = Immutable.fromJS({
    locationBeforeTransitions: null
  })
  const action = {
    type: LOCATION_CHANGE,
    payload: {
      pathname: '/pathname'
    }
  }
  const expectedNextState = Immutable.Map({
    locationBeforeTransitions: {
      pathname: '/pathname'
    }
  })

  expect(reducer(state, action)).toEqual(expectedNextState)
})
