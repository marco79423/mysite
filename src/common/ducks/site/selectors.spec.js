import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'

import * as selectors from './selectors'

beforeAll(() => {
  jest.addMatchers(matchers)
})

test('getSiteHeadConfig should return site head config', () => {
  const state = Immutable.fromJS({
    config: {
      SITE_NAME: 'SITE_NAME',
      SITE_META: {
        name1: 'content1',
        name2: 'content2',
      },
      SITE_LINK: {
        rel1: 'href1',
        rel2: 'href2',
      }
    }
  })
  const expected = Immutable.fromJS({
    title: 'SITE_NAME',
    meta: [
      {name: 'name1', content: 'content1'},
      {name: 'name2', content: 'content2'},
    ],
    link: [
      {rel: 'rel1', href: 'href1'},
      {rel: 'rel2', href: 'href2'},
    ],

  })
  expect(selectors.getSiteHeadConfig(state)).toEqualImmutable(expected)
})

test('getArticleSiteHeadConfig should return site head config for articles', () => {
  const props = {
    params: {
      slug: '美女最變態'
    }
  }
  const state = Immutable.fromJS({
    routing: Immutable.Map({
      locationBeforeTransitions: {
        pathname: '/pathname'
      }
    }),
    config: {
      SITE_NAME: 'SITE_NAME',
      HOST_URL: 'HOST_URL',
      SITE_META: {
        name1: 'content1',
        name2: 'content2',
      },
      SITE_LINK: {
        rel1: 'href1',
        rel2: 'href2',
      }
    },
    article: {
      items: [
        {
          'slug': '美女最變態',
          'title': '美女最變態',
          'summary': 'summary',
          'raw_summary': 'raw_summary'
        }
      ]
    }
  })
  const expected = Immutable.fromJS({
    title: '美女最變態 - SITE_NAME',
    meta: [
      {name: 'name1', content: 'content1'},
      {name: 'name2', content: 'content2'},
      {name: 'description', content: 'raw_summary'},
      {name: 'og:title', content: '美女最變態 - SITE_NAME'},
      {name: 'og:url', content: 'HOST_URL/pathname'},
      {name: 'og:description', content: 'raw_summary'}
    ],
    link: [
      {rel: 'rel1', href: 'href1'},
      {rel: 'rel2', href: 'href2'}
    ]
  })

  expect(selectors.getArticleSiteHeadConfig(state, props)).toEqualImmutable(expected)
})

