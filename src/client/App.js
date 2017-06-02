import React from 'react'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import { configureStore } from '../common/store'
import { createRoutes } from '../common/routes'
import saga from '../common/ducks/saga'

import 'isomorphic-fetch'

import '../common/css/base.scss'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toObject()
  }
})
store.runSaga(saga)

export class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {createRoutes(history)}
      </Provider>
    )
  }
}

export default App
