import * as React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux';

import PostList from '../post-list';

import store from './store';

import 'purecss/build/pure.css';
import '../../css/base.css';


const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
        return state.toJS();
    }
});

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path='/' component={PostList} />
                </Router>
            </Provider>
        );
    }
}

export default App;
