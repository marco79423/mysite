import * as chai from 'chai'
import * as Immutable from 'immutable'
import chaiImmutable from 'chai-immutable'

import * as actions from './actions'
import reducer from './reducer'


chai.use(chaiImmutable)


describe('reducer of main', function () {

  it('should return a state with a new value', function () {
    const state = Immutable.fromJS({
      value: 1
    })
    const action = actions.addValue()
    const expectedNextState = Immutable.fromJS({
      value: 2
    })

    chai.expect(reducer(state, action)).to.eql(expectedNextState)
  })
})