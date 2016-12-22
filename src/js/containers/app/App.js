import * as React from 'react'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux'

import store from './store'
import routes from './routes';

import 'purecss/build/pure.css'
import '../../../css/base.scss'


const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toObject()
  }
})

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    )
  }
}

export default App
