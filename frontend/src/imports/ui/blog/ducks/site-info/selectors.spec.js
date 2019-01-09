import * as selectors from './selectors'

test('getRepositoryVersion should return backend version', () => {
  const state = {
    siteInfo: {
      siteUpdatedTime: '2018-11-05T07:31:32.095886+00:00',
      repositoryVersion: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
    }
  }
  const expected = 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
  expect(selectors.getRepositoryVersion(state)).toEqual(expected)
})

test('getSiteUpdatedTime should return the updated time of this site', () => {
  const state = {
    siteInfo: {
      siteUpdatedTime: '2018-11-05T07:31:32.095886+00:00',
      repositoryVersion: 'develop (81ccde3550325c06a10b6acce75b4df529955472)'
    }
  }
  const expected = '2018-11-05T07:31:32.095886+00:00'
  expect(selectors.getSiteUpdatedTime(state)).toEqual(expected)
})
