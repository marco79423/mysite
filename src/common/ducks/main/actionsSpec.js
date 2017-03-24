import * as chai from 'chai'

import * as actionTypes from './actionTypes'
import * as actions from './actions'


describe('actions of main', () => {

  it('addValue should create an action to add value', () => {
    const expectedAction = {
      type: actionTypes.ADD_VALUE
    }

    chai.expect(actions.addValue()).to.deep.equal(expectedAction)
  })
})