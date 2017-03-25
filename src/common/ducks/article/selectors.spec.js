import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'
import moment from 'moment'

import * as selectors from './selectors'


jest.addMatchers(matchers)

const articles = [
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
  }
]

test('getAllArticles should return articles with correct naming convention', () => {
    const state = Immutable.fromJS({
        article: {
            items: articles
        }
    })
    const expected = Immutable.fromJS([
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
    expect(selectors.getAllArticles(state)).toEqualImmutable(expected)
})

