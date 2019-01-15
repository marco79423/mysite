import * as actionTypes from './actionTypes'
import * as actions from './actions'

test('fetchPages should create an action to fetch pages', () => {
  const expectedAction = {
    type: actionTypes.FETCH_PAGES
  }
  expect(actions.fetchPages()).toEqual(expectedAction)
})

test('setPages should create an action to set pages', () => {
  const pages = [
    {
      'app': 'me',
      'title': '成功日記'
    },
    {
      'app': 'me',
      'title': '閱讀計劃'
    },
  ]
  const expectedAction = {
    type: actionTypes.SET_PAGES,
    payload: pages
  }
  expect(actions.setPages(pages)).toEqual(expectedAction)
})
