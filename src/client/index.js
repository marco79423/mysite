import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from '../shared/Root'
import saga from '../shared/blog/ducks/saga'
import { configureStore } from '../shared/store'


(function run () {
  render(Root)

  if (module.hot) {
    module.hot.accept('../shared/Root', () => { render(Root) })
  }
})()

function render (Component) {
  const store = configureStore()
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
      return state.get('routing').toObject()
    }
  })
  store.runSaga(saga)

  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} type="client" />
    </AppContainer>,
    document.getElementById('app'),
  )
}
