import {LOCATION_CHANGE} from 'react-router-redux'

const initialState = {
  locationBeforeTransitions: null
}

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return {
      locationBeforeTransitions: action.payload
    }
  }

  return state
}
