import * as selectors from './selectors'

describe('getPathName', () => {
  test('should return current path name', () => {
    const state = {
      router: {
        location: {
          pathname: '/pathname'
        }
      }
    }
    const expected = '/pathname'
    expect(selectors.getPathName(state)).toEqual(expected)
  })
})

test('getCurrentUrl should return current url', () => {
  const state = {
    config: {
      HOST_URL: 'HOST_URL'
    },
    router: {
      location: {
        pathname: '/pathname'
      }
    }
  }
  const expected = 'HOST_URL/pathname'
  expect(selectors.getCurrentUrl(state)).toEqual(expected)
})

