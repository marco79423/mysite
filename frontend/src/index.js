import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import App from './imports/app/App'
import saga from './imports/app/blog/ducks/saga'
import {configureStore} from './imports/app/store'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.routing
  }
})
store.runSaga(saga)

ReactDOM.render(
  <App store={store} history={history}/>,
  document.getElementById('app')
)
