import * as actions from './actions'
import reducer from './reducer'

test('article reducer return a state with new site info', () => {
  const state = {
    repositoryVersion: '',
    siteUpdatedTime: '',
  }
  const action = actions.setSiteInfo({
    repositoryVersion: 'develop (81ccde3550325c06a10b6acce75b4df529955472)',
    siteUpdatedTime: '2018-11-05T07:31:32.095886+00:00',
  })
  const expectedNextState = {
    repositoryVersion: 'develop (81ccde3550325c06a10b6acce75b4df529955472)',
    siteUpdatedTime: '2018-11-05T07:31:32.095886+00:00',
  }

  expect(reducer(state, action)).toEqual(expectedNextState)
})
