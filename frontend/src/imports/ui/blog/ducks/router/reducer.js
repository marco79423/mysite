import {connectRouter} from 'connected-react-router'

import {createBrowserHistory} from 'history'

export const history = createBrowserHistory()

export default connectRouter(history)
