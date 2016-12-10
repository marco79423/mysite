import * as React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux';

import ArticleList from '../article-list';
import Article from '../article';

import store from './store';

import 'purecss/build/pure.css';
import '../../../css/base.scss';


const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toObject();
    }
});

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path='/' component={ArticleList} />
                    <Route path='/articles/:slug/' component={Article} />
                </Router>
            </Provider>
        );
    }
}

export default App;
