import * as selectors from './selectors'

const articles = [
  {
    'slug': '淺談-regex-及其應用',
    'path': '/articles/淺談-regex-及其應用',
    'url': 'https://hostUrl/articles/淺談-regex-及其應用',
    'title': '淺談 regex 及其應用',
    'date': '2015-10-04T00:00:00',
    'modifiedDate': '2015-11-22T00:00:00',
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
    'chickenCount': 199,
    'content': 'content',
    'summary': 'summary',
    'rawSummary': 'rawSummary'
  },
  {
    'slug': '擁抱',
    'path': '/articles/擁抱',
    'url': 'https://hostUrl/articles/擁抱',
    'title': '擁抱',
    'date': '2013-02-16T00:00:00',
    'modifiedDate': null,
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'chickenCount': 1,
    'content': 'content',
    'summary': 'summary',
    'rawSummary': 'rawSummary'
  },
  {
    'slug': '美女最變態',
    'path': '/articles/美女最變態',
    'url': 'https://hostUrl/articles/美女最變態',
    'title': '美女最變態',
    'date': '2013-02-02T00:00:00',
    'modifiedDate': '2015-08-24T00:00:00',
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'chickenCount': 0,
    'content': 'content',
    'summary': 'summary',
    'rawSummary': 'rawSummary'
  }
]

test('getArticles should return articles with correct naming convention', () => {
  const state = {
    config: {
      HOST_URL: 'https://hostUrl',
    },
    article: {
      slugs: articles.map(article => article.slug),
      items: articles.reduce((items, article) => ({
        ...items,
        [article.slug]: article
      }), {})
    }
  }
  const expected = [
    {
      'slug': '淺談-regex-及其應用',
      'path': '/articles/淺談-regex-及其應用',
      'url': 'https://hostUrl/articles/淺談-regex-及其應用',
      'title': '淺談 regex 及其應用',
      'date': new Date('2015-10-04T00:00:00'),
      'modifiedDate': new Date('2015-11-22T00:00:00'),
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
      'chickenCount': 199,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'rawSummary'
    },
    {
      'slug': '擁抱',
      'path': '/articles/擁抱',
      'url': 'https://hostUrl/articles/擁抱',
      'title': '擁抱',
      'date': new Date('2013-02-16T00:00:00'),
      'modifiedDate': null,
      'categories': [
        {
          'slug': '胡言亂語',
          'name': '胡言亂語'
        }
      ],
      'chickenCount': 1,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'rawSummary'
    },
    {
      'slug': '美女最變態',
      'path': '/articles/美女最變態',
      'url': 'https://hostUrl/articles/美女最變態',
      'title': '美女最變態',
      'date': new Date('2013-02-02T00:00:00'),
      'modifiedDate': new Date('2015-08-24T00:00:00'),
      'categories': [
        {
          'slug': '胡言亂語',
          'name': '胡言亂語'
        }
      ],
      'chickenCount': 0,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'rawSummary'
    }
  ]
  expect(selectors.getArticles(state)).toEqual(expected)
})

describe('getArticlesByCategory', () => {
  const expected = [
    {
      'slug': '淺談-regex-及其應用',
      'path': '/articles/淺談-regex-及其應用',
      'url': 'https://hostUrl/articles/淺談-regex-及其應用',
      'title': '淺談 regex 及其應用',
      'date': new Date('2015-10-04T00:00:00'),
      'modifiedDate': new Date('2015-11-22T00:00:00'),
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
      'chickenCount': 199,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'rawSummary'
    }
  ]

  test('should return article list by props.match.params.category', () => {
    const props = {
      match: {
        params: {
          category: 'python'
        }
      }
    }

    const state = {
      config: {
        HOST_URL: 'https://hostUrl',
      },
      article: {
        slugs: articles.map(article => article.slug),
        items: articles.reduce((items, article) => ({
          ...items,
          [article.slug]: article
        }), {})
      }
    }
    expect(selectors.getArticlesByCategory(state, props)).toEqual(expected)
  })
})

test('getArticle should return articles with correct naming convention', () => {
  const slug = '美女最變態'
  const state = {
    config: {
      HOST_URL: 'https://hostUrl',
    },
    article: {
      items: articles.reduce((items, article) => ({
        ...items,
        [article.slug]: article
      }), {})
    }
  }

  const expected = {
    'slug': '美女最變態',
    'path': '/articles/美女最變態',
    'url': 'https://hostUrl/articles/美女最變態',
    'title': '美女最變態',
    'date': new Date('2013-02-02T00:00:00'),
    'modifiedDate': new Date('2015-08-24T00:00:00'),
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'chickenCount': 0,
    'content': 'content',
    'summary': 'summary',
    'rawSummary': 'rawSummary'
  }
  expect(selectors.getArticle(slug)(state)).toEqual(expected)
})

describe('getRecentArticles', () => {
  test('should return recent articles (articles > config)', () => {
    const props = {}
    const state = {
      config: {
        RECENT_ARTICLE_COUNT: 2,
        HOST_URL: 'https://hostUrl',
      },
      article: {
        slugs: articles.map(article => article.slug),
        items: articles.reduce((items, article) => ({
          ...items,
          [article.slug]: article
        }), {})
      }
    }
    const expected = [
      {
        'slug': '淺談-regex-及其應用',
        'path': '/articles/淺談-regex-及其應用',
        'url': 'https://hostUrl/articles/淺談-regex-及其應用',
        'title': '淺談 regex 及其應用',
        'date': new Date('2015-10-04T00:00:00'),
        'modifiedDate': new Date('2015-11-22T00:00:00'),
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
        'chickenCount': 199,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'rawSummary'
      },
      {
        'slug': '擁抱',
        'path': '/articles/擁抱',
        'url': 'https://hostUrl/articles/擁抱',
        'title': '擁抱',
        'date': new Date('2013-02-16T00:00:00'),
        'modifiedDate': null,
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 1,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'rawSummary'
      },
    ]
    expect(selectors.getRecentArticles(state, props)).toEqual(expected)
  })

  test('should return recent articles (articles < config)', () => {
    const props = {}
    const state = {
      config: {
        HOST_URL: 'https://hostUrl',
        RECENT_ARTICLE_COUNT: 4
      },
      article: {
        slugs: articles.map(article => article.slug),
        items: articles.reduce((items, article) => ({
          ...items,
          [article.slug]: article
        }), {})
      }
    }
    const expected = [
      {
        'slug': '淺談-regex-及其應用',
        'path': '/articles/淺談-regex-及其應用',
        'url': 'https://hostUrl/articles/淺談-regex-及其應用',
        'title': '淺談 regex 及其應用',
        'date': new Date('2015-10-04T00:00:00'),
        'modifiedDate': new Date('2015-11-22T00:00:00'),
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
        'chickenCount': 199,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'rawSummary'
      },
      {
        'slug': '擁抱',
        'path': '/articles/擁抱',
        'url': 'https://hostUrl/articles/擁抱',
        'title': '擁抱',
        'date': new Date('2013-02-16T00:00:00'),
        'modifiedDate': null,
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 1,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'rawSummary'
      },
      {
        'slug': '美女最變態',
        'path': '/articles/美女最變態',
        'url': 'https://hostUrl/articles/美女最變態',
        'title': '美女最變態',
        'date': new Date('2013-02-02T00:00:00'),
        'modifiedDate': new Date('2015-08-24T00:00:00'),
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 0,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'rawSummary'
      }
    ]
    expect(selectors.getRecentArticles(state, props)).toEqual(expected)
  })
})
