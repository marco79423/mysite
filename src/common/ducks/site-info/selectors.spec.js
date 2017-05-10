import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'

import * as selectors from './selectors'

beforeAll(() => {
  jest.addMatchers(matchers)
})

test('getArticles should return articles with correct naming convention', () => {
  const state = Immutable.fromJS({
    siteInfo: {
      version: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
    }
  })
  const expected = 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
  expect(selectors.getBackendVersion(state)).toEqualImmutable(expected)
})
