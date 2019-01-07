import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'

import * as selectors from './selectors'

beforeAll(() => {
  jest.addMatchers(matchers)
})

describe('getPathName', () => {
  test('should return current path name', () => {
    const state = Immutable.Map({
      routing: Immutable.Map({
        locationBeforeTransitions: {
          pathname: '/pathname'
        }
      })
    })
    const expected = '/pathname'
    expect(selectors.getPathName(state)).toEqualImmutable(expected)
  })

  test('should return "/" without path information', () => {
    const state = Immutable.Map({
      routing: Immutable.Map({
        locationBeforeTransitions: null
      })
    })
    const expected = '/'
    expect(selectors.getPathName(state)).toEqualImmutable(expected)
  })
})

test('getCurrentUrl should return current url', () => {
  const state = Immutable.Map({
    config: Immutable.Map({
      HOST_URL: 'HOST_URL'
    }),
    routing: Immutable.Map({
      locationBeforeTransitions: {
        pathname: '/pathname'
      }
    })
  })
  const expected = 'HOST_URL/pathname'
  expect(selectors.getCurrentUrl(state)).toEqualImmutable(expected)
})

