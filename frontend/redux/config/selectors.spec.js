import * as selectors from './selectors'

test('getHostUrl should return host url', () => {
  const state = {
    config: {
      HOST_URL: 'HOST_URL'
    }
  }
  const expected = 'HOST_URL'
  expect(selectors.getHostUrl(state)).toEqual(expected)
})

test('getBackendServerUrl should return api server url', () => {
  const state = {
    config: {
      BACKEND_SERVER_URL: 'BACKEND_SERVER_URL'
    }
  }
  const expected = 'BACKEND_SERVER_URL'
  expect(selectors.getBackendServerUrl(state)).toEqual(expected)
})

test('getSiteName should return site name', () => {
  const state = {
    config: {
      SITE_NAME: 'SITE_NAME'
    }
  }
  const expected = 'SITE_NAME'
  expect(selectors.getSiteName(state)).toEqual(expected)
})

test('getSiteMeta should return site meta', () => {
  const state = {
    config: {
      SITE_META: 'SITE_META'
    }
  }
  const expected = 'SITE_META'
  expect(selectors.getSiteMeta(state)).toEqual(expected)
})

test('getSiteLink should return site link', () => {
  const state = {
    config: {
      SITE_LINK: 'SITE_LINK'
    }
  }
  const expected = 'SITE_LINK'
  expect(selectors.getSiteLink(state)).toEqual(expected)
})

test('getPageSize should return page size of article list', () => {
  const state = {
    config: {
      PAGE_SIZE: 'PAGE_SIZE'
    }
  }
  const expected = 'PAGE_SIZE'
  expect(selectors.getPageSize(state)).toEqual(expected)
})

test('getRecentArticleCount should return the max count of recent articles', () => {
  const state = {
    config: {
      RECENT_ARTICLE_COUNT: 'RECENT_ARTICLE_COUNT'
    }
  }
  const expected = 'RECENT_ARTICLE_COUNT'
  expect(selectors.getRecentArticleCount(state)).toEqual(expected)
})

test('getCommentConfig should return the max count of recent articles', () => {
  const state = {
    config: {
      COMMENT_CONFIG: 'COMMENT_CONFIG'
    }
  }
  const expected = 'COMMENT_CONFIG'
  expect(selectors.getCommentConfig(state)).toEqual(expected)
})
