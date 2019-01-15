import React from 'react'
import ReactDOM from 'react-dom'

import App from './imports/ui/App'
import saga from './imports/ui/blog/ducks/saga'
import {configureStore} from './imports/ui/store'

const store = configureStore()
store.runSaga(saga)

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('app')
)
