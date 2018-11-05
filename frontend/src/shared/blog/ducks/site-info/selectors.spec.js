import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'

import * as selectors from './selectors'

beforeAll(() => {
  jest.addMatchers(matchers)
})

test('getRepositoryVersion should return backend version', () => {
  const state = Immutable.fromJS({
    siteInfo: {
      updated_time: '2018-11-05T07:31:32.095886+00:00',
      repo_version: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
    }
  })
  const expected = 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
  expect(selectors.getRepositoryVersion(state)).toEqualImmutable(expected)
})

test('getSiteUpdatedTime should return the updated time of this site', () => {
  const state = Immutable.fromJS({
    siteInfo: {
      updated_time: '2018-11-05T07:31:32.095886+00:00',
      repo_version: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
    }
  })
  const expected = '2018-11-05T07:31:32.095886+00:00'
  expect(selectors.getSiteUpdatedTime(state)).toEqualImmutable(expected)
})
