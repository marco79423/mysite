import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'

import * as selectors from './selectors'

beforeAll(() => {
  jest.addMatchers(matchers)
})

test('getHostUrl should return host url', () => {
  const state = Immutable.fromJS({
    config: {
      HOST_URL: 'HOST_URL'
    }
  })
  const expected = 'HOST_URL'
  expect(selectors.getHostUrl(state)).toEqualImmutable(expected)
})

test('getBackendServerUrl should return api server url', () => {
  const state = Immutable.fromJS({
    config: {
      BACKEND_SERVER_URL: 'BACKEND_SERVER_URL'
    }
  })
  const expected = 'BACKEND_SERVER_URL'
  expect(selectors.getBackendServerUrl(state)).toEqualImmutable(expected)
})

test('getSiteName should return site name', () => {
  const state = Immutable.fromJS({
    config: {
      SITE_NAME: 'SITE_NAME'
    }
  })
  const expected = 'SITE_NAME'
  expect(selectors.getSiteName(state)).toEqualImmutable(expected)
})

test('getSiteMeta should return site meta', () => {
  const state = Immutable.fromJS({
    config: {
      SITE_META: 'SITE_META'
    }
  })
  const expected = 'SITE_META'
  expect(selectors.getSiteMeta(state)).toEqualImmutable(expected)
})

test('getSiteLink should return site link', () => {
  const state = Immutable.fromJS({
    config: {
      SITE_LINK: 'SITE_LINK'
    }
  })
  const expected = 'SITE_LINK'
  expect(selectors.getSiteLink(state)).toEqualImmutable(expected)
})

test('getPageSize should return page size of article list', () => {
  const state = Immutable.fromJS({
    config: {
      PAGE_SIZE: 'PAGE_SIZE'
    }
  })
  const expected = 'PAGE_SIZE'
  expect(selectors.getPageSize(state)).toEqualImmutable(expected)
})

test('getRecentArticleCount should return the max count of recent articles', () => {
  const state = Immutable.fromJS({
    config: {
      RECENT_ARTICLE_COUNT: 'RECENT_ARTICLE_COUNT'
    }
  })
  const expected = 'RECENT_ARTICLE_COUNT'
  expect(selectors.getRecentArticleCount(state)).toEqualImmutable(expected)
})

test('getCommentConfig should return the max count of recent articles', () => {
  const state = Immutable.fromJS({
    config: {
      COMMENT_CONFIG: 'COMMENT_CONFIG'
    }
  })
  const expected = 'COMMENT_CONFIG'
  expect(selectors.getCommentConfig(state)).toEqualImmutable(expected)
})

test('getSiteVersion should return the version of this site', () => {
  const state = Immutable.fromJS({
    config: {
      SITE_VERSION: 'SITE_VERSION'
    }
  })
  const expected = 'SITE_VERSION'
  expect(selectors.getSiteVersion(state)).toEqualImmutable(expected)
})

test('getSiteUpdatedTime should return the updated time of this site', () => {
  const state = Immutable.fromJS({
    config: {
      SITE_UPDATED_TIME: 'SITE_UPDATED_TIME'
    }
  })
  const expected = 'SITE_UPDATED_TIME'
  expect(selectors.getSiteUpdatedTime(state)).toEqualImmutable(expected)
})
