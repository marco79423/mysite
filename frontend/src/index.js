import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import App from './imports/ui/App'
import saga from './imports/ui/blog/ducks/saga'
import {configureStore} from './imports/ui/store'

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
