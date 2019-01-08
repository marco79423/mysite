import * as selectors from './selectors'

describe('getPathName', () => {
  test('should return current path name', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          pathname: '/pathname'
        }
      }
    }
    const expected = '/pathname'
    expect(selectors.getPathName(state)).toEqual(expected)
  })

  test('should return "/" without path information', () => {
    const state = {
      routing: {
        locationBeforeTransitions: null
      }
    }
    const expected = '/'
    expect(selectors.getPathName(state)).toEqual(expected)
  })
})

test('getCurrentUrl should return current url', () => {
  const state = {
    config: {
      HOST_URL: 'HOST_URL'
    },
    routing: {
      locationBeforeTransitions: {
        pathname: '/pathname'
      }
    }
  }
  const expected = 'HOST_URL/pathname'
  expect(selectors.getCurrentUrl(state)).toEqual(expected)
})

