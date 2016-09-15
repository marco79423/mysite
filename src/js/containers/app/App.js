import * as React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux';

import ArticleList from '../article-list';

import store from './store';

import '../../css/base.css';


const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.toJS();
    }
});

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path='/' component={ArticleList} />
                </Router>
            </Provider>
        );
    }
}

export default App;
