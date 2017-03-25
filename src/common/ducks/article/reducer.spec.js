import * as chai from 'chai'
import * as Immutable from 'immutable'
import chaiImmutable from 'chai-immutable'

import * as actions from './actions'
import reducer from './reducer'


chai.use(chaiImmutable)


describe('reducer of articles', function () {

  it('should return a state with articles', function () {
    const state = Immutable.fromJS({
      items: []
    })
    const action = actions.setArticles([
      'article 1', 'article2'
    ])
    const expectedNextState = Immutable.fromJS({
      items: ['article 1', 'article2']
    })

    chai.expect(reducer(state, action)).to.eql(expectedNextState)
  })
})
