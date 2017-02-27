import * as chai from 'chai'

import * as actionTypes from './actionTypes'
import * as actions from './actions'


describe('actions of main', () => {

  it('addValue should create an action to add value', () => {
    const expectedAction = {
      type: actionTypes.ADD_VALUE,
      payload: undefined
    }
    chai.expect(actions.addValue()).to.eql(expectedAction)
  })
})