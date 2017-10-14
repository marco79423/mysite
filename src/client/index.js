import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from '../common/Root'
import saga from '../common/blog/saga'
import { configureStore } from '../common/store'

function run () {
  const store = configureStore()
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
      return state.get('routing').toObject()
    }
  })
  store.runSaga(saga)

  ReactDOM.render(
    <Root store={store} history={history} type="client"/>,
    document.getElementById('app')
  )
}

run()