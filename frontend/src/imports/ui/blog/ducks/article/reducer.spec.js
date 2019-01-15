import * as actions from './actions'
import reducer from './reducer'

test('article reducer return a state with new articles', () => {
  const state = {
    items: []
  }
  const action = actions.setArticles([
    'article 1', 'article2'
  ])
  const expectedNextState = {
    items: ['article 1', 'article2']
  }

  expect(reducer(state, action)).toEqual(expectedNextState)
})
