import * as React from 'react'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux'

import {configureStore} from '../common/store'
import {createRoutes} from './routes';

import 'isomorphic-fetch';

import 'purecss/build/pure.css'
import './css/base.scss'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toObject()
  }
})

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {createRoutes(history)}
      </Provider>
    )
  }
}

export default App
