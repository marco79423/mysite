import * as actions from './actions'
import reducer from './reducer'

test('article reducer return a state with new articles', () => {
  const state = {
    slugs: [],
    items: {},
  }
  const action = actions.setArticles([
    {
      'slug': '淺談-regex-及其應用',
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
  ])
  const expectedNextState = {
    slugs: ['淺談-regex-及其應用', '擁抱'],
    items: {
      '淺談-regex-及其應用': {
        'slug': '淺談-regex-及其應用',
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
      '擁抱': {
        'slug': '擁抱',
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
      }
    }
  }

  expect(reducer(state, action)).toEqual(expectedNextState)
})
