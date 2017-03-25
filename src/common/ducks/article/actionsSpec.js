import 'babel-polyfill'
import 'isomorphic-fetch'

import * as chai from 'chai'
import * as Immutable from 'immutable'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actionTypes from './actionTypes'
import * as actions from './actions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)


describe('actions of articles', function(){

  const articles = [
    {
      'title': '美女最變態',
      'date': '2013-02-02T00:00:00'
    },
    {
      'title': '小雞跳樓梯',
      'date': '2013-02-18T00:00:00',
    },
    {
      'title': '擁抱',
      'date': '2013-02-16T00:00:00',
    }
  ]

  const sortedArticles = [
    {
      'title': '小雞跳樓梯',
      'date': '2013-02-18T00:00:00',
    },
    {
      'title': '擁抱',
      'date': '2013-02-16T00:00:00',
    },
    {
      'title': '美女最變態',
      'date': '2013-02-02T00:00:00'
    }
  ]

  it('should create an action to set articles', function (){
    const expectedAction = {
        type: actionTypes.SET_ARTICLES,
        payload: articles
    }

    chai.expect(actions.setArticles(articles)).to.eql(expectedAction)
  })

  it('should create an action to fetch articles for api server', function (done) {
      const store = mockStore(Immutable.fromJS({
        config: {
          API_SERVER_URL: 'https://api.marco79423.net'
        }
      }))

      const expectedActions = [
          {
              type: actionTypes.SET_ARTICLES,
              payload: sortedArticles
          }
      ]

      fetchMock.once('https://api.marco79423.net/articles/', articles)
      store.dispatch(actions.fetchArticles())
        .then(() => {
          chai.expect(store.getActions()).to.eql(expectedActions)
          done()
        })
  })
})