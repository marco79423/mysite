import 'isomorphic-fetch'

import * as actionTypes from './actionTypes'
import * as actions from './actions'

const siteInfo = {
  'version': 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
}

test('setSiteInfo should create an action to set articles', () => {
  const expectedAction = {
    type: actionTypes.SET_SITE_INFO,
    payload: siteInfo
  }
  expect(actions.setSiteInfo(siteInfo)).toEqual(expectedAction)
})
