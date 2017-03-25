import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'
import moment from 'moment'

import * as selectors from './selectors'

const articles = [
  {
    'slug': '淺談-regex-及其應用',
    'title': '淺談 regex 及其應用',
    'date': '2015-10-04T00:00:00',
    'modified_date': '2015-11-22T00:00:00',
    'categories': [
      {
        'slug': '程式設計',
        'name': '程式設計'
      },
      {
        'slug': 'python',
        'name': 'Python'
      }
    ],
    'content': 'content',
    'summary': 'summary',
    'raw_summary': 'raw_summary'
  },
  {
    'slug': '擁抱',
    'title': '擁抱',
    'date': '2013-02-16T00:00:00',
    'modified_date': null,
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'content': 'content',
    'summary': 'summary',
    'raw_summary': 'raw_summary'
  },
  {
    'slug': '美女最變態',
    'title': '美女最變態',
    'date': '2013-02-02T00:00:00',
    'modified_date': '2015-08-24T00:00:00',
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'content': 'content',
    'summary': 'summary',
    'raw_summary': 'raw_summary'
  }
]

beforeAll(() => {
  jest.addMatchers(matchers)
})

test('getAllArticles should return articles with correct naming convention', () => {
  const state = Immutable.fromJS({
    article: {
      items: articles
    }
  })
  const expected = Immutable.fromJS([
    {
      'slug': '淺談-regex-及其應用',
      'title': '淺談 regex 及其應用',
      'date': moment('2015-10-04T00:00:00'),
      'modifiedDate': moment('2015-11-22T00:00:00'),
      'categories': [
        {
          'slug': '程式設計',
          'name': '程式設計'
        },
        {
          'slug': 'python',
          'name': 'Python'
        }
      ],
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'raw_summary'
    },
    {
      'slug': '擁抱',
      'title': '擁抱',
      'date': moment('2013-02-16T00:00:00'),
      'modifiedDate': null,
      'categories': [
        {
          'slug': '胡言亂語',
          'name': '胡言亂語'
        }
      ],
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'raw_summary'
    },
    {
      'slug': '美女最變態',
      'title': '美女最變態',
      'date': moment('2013-02-02T00:00:00'),
      'modifiedDate': moment('2015-08-24T00:00:00'),
      'categories': [
        {
          'slug': '胡言亂語',
          'name': '胡言亂語'
        }
      ],
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'raw_summary'
    }
  ])
  expect(selectors.getAllArticles(state)).toEqualImmutable(expected)
})

test('getArticle should return articles with correct naming convention', () => {
  const props = {
    params: {
      slug: '美女最變態'
    }
  }
  const state = Immutable.fromJS({
    article: {
      items: articles
    }
  })

  const expected = Immutable.fromJS({
    'slug': '美女最變態',
    'title': '美女最變態',
    'date': moment('2013-02-02T00:00:00'),
    'modifiedDate': moment('2015-08-24T00:00:00'),
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'content': 'content',
    'summary': 'summary',
    'rawSummary': 'raw_summary'
  })
  expect(selectors.getArticle(state, props)).toEqualImmutable(expected)
})

describe('getPageNum', () => {
  test('should return page num', () => {
    const props = {
      params: {
        pageNum: '3'
      }
    }
    const state = Immutable.Map()
    const expected = 3
    expect(selectors.getPageNum(state, props)).toEqualImmutable(expected)
  })

  test('should return 1 without page num information', () => {
    const props = {
      params: {}
    }
    const state = Immutable.Map()
    const expected = 1
    expect(selectors.getPageNum(state, props)).toEqualImmutable(expected)
  })
})

describe('getArticles', () => {
  test('should return article list by category', () => {
    const props = {
      params: {
        category: 'python'
      }
    }

    const state = Immutable.fromJS({
      config: {
        PAGE_SIZE: 1
      },
      article: {
        items: articles
      }
    })
    const expected = Immutable.fromJS([
      {
        'slug': '淺談-regex-及其應用',
        'title': '淺談 regex 及其應用',
        'date': moment('2015-10-04T00:00:00'),
        'modifiedDate': moment('2015-11-22T00:00:00'),
        'categories': [
          {
            'slug': '程式設計',
            'name': '程式設計'
          },
          {
            'slug': 'python',
            'name': 'Python'
          }
        ],
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      }
    ])
    expect(selectors.getArticles(state, props)).toEqualImmutable(expected)
  })

  test('should return article list by page', () => {
    const props = {
      params: {
        pageNum: '2',
        category: 'python'
      }
    }
    const state = Immutable.fromJS({
      config: {
        PAGE_SIZE: 1
      },
      article: {
        items: articles
      }
    })
    const expected = Immutable.fromJS([])
    expect(selectors.getArticles(state, props)).toEqualImmutable(expected)
  })
})

describe('getMaxPageNum', () => {
  test('should return page num (>1)', () => {
    const props = {
      params: {
        category: '胡言亂語'
      }
    }
    const state = Immutable.fromJS({
      config: {
        PAGE_SIZE: 1
      },
      article: {
        items: articles
      }
    })
    const expected = 2
    expect(selectors.getMaxPageNum(state, props)).toEqualImmutable(expected)
  })

  test('should return page num (=1)', () => {
    const props = {
      params: {
        category: '胡言亂語'
      }
    }
    const state = Immutable.fromJS({
      config: {
        PAGE_SIZE: 4
      },
      article: {
        items: articles
      }
    })
    const expected = 1
    expect(selectors.getMaxPageNum(state, props)).toEqualImmutable(expected)
  })
})

describe('getRecentArticles', () => {
  test('should return recent articles (articles > config)', () => {
    const state = Immutable.fromJS({
      config: {
        RECENT_ARTICLE_COUNT: 2
      },
      article: {
        items: articles
      }
    })
    const expected = Immutable.fromJS([
      {
        'slug': '淺談-regex-及其應用',
        'title': '淺談 regex 及其應用',
        'date': moment('2015-10-04T00:00:00'),
        'modifiedDate': moment('2015-11-22T00:00:00'),
        'categories': [
          {
            'slug': '程式設計',
            'name': '程式設計'
          },
          {
            'slug': 'python',
            'name': 'Python'
          }
        ],
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      },
      {
        'slug': '擁抱',
        'title': '擁抱',
        'date': moment('2013-02-16T00:00:00'),
        'modifiedDate': null,
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      }
    ])
    expect(selectors.getRecentArticles(state)).toEqualImmutable(expected)
  })

  test('should return recent articles (articles < config)', () => {
    const props = {
      params: {
        category: '胡言亂語'
      }
    }
    const state = Immutable.fromJS({
      config: {
        RECENT_ARTICLE_COUNT: 4
      },
      article: {
        items: articles
      }
    })
    const expected = Immutable.fromJS([
      {
        'slug': '淺談-regex-及其應用',
        'title': '淺談 regex 及其應用',
        'date': moment('2015-10-04T00:00:00'),
        'modifiedDate': moment('2015-11-22T00:00:00'),
        'categories': [
          {
            'slug': '程式設計',
            'name': '程式設計'
          },
          {
            'slug': 'python',
            'name': 'Python'
          }
        ],
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      },
      {
        'slug': '擁抱',
        'title': '擁抱',
        'date': moment('2013-02-16T00:00:00'),
        'modifiedDate': null,
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      },
      {
        'slug': '美女最變態',
        'title': '美女最變態',
        'date': moment('2013-02-02T00:00:00'),
        'modifiedDate': moment('2015-08-24T00:00:00'),
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      }
    ])
    expect(selectors.getRecentArticles(state, props)).toEqualImmutable(expected)
  })
})

test('getSocialConfig should return social config', () => {
  const props = {
    params: {
      slug: '美女最變態'
    }
  }
  const state = Immutable.fromJS({
    config: {
      HOST_URL: 'HOST_URL'
    },
    routing: Immutable.Map({
      locationBeforeTransitions: {
        pathname: '/pathname'
      }
    }),
    article: {
      items: articles
    }
  })

  const expected = Immutable.fromJS({
    shareUrl: 'HOST_URL/pathname',
    title: '美女最變態'
  })
  expect(selectors.getSocialConfig(state, props)).toEqualImmutable(expected)
})
