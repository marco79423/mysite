import * as React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux';

import store from './store';
import Main from '../main';


const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.toJS();
    }
});

export class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path='/' component={Main} />
                </Router>
            </Provider>
        );
    }
}

export default Root;