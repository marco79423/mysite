import React from 'react'

import App from './imports/ui/App'
import saga from './imports/ui/blog/ducks/saga'
import {configureStore} from './imports/ui/store'

const store = configureStore()
store.runSaga(saga)

export default function NextIndexWrapper() {
  return <App store={store}/>
}
