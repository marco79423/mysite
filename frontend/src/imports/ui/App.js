import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'

import ArticleListPage from './blog/pages/ArticleListPage'
import CategorizedArticleListPage from './blog/pages/CategorizedArticleListPage'
import ArchivesPage from './blog/pages/ArchivesPage'
import ArticleDetailPage from './blog/pages/ArticleDetailPage'

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.any.isRequired,
    renderProps: PropTypes.any,
  }

  componentDidMount() {
    this.props.store.history.listen((location, action) => {
      window.scrollTo(0, 0)
    })
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.store.history}>
          <>
            <Switch>
              <Route exact path="/" component={ArticleListPage}/>
              <Route path="/articles/page/:pageNum/" component={ArticleListPage}/>
              <Route exact path="/articles/category/:category/" component={CategorizedArticleListPage}/>
              <Route path="/articles/category/:category/page/:pageNum/" component={CategorizedArticleListPage}/>
              <Route path="/articles/archives/" component={ArchivesPage}/>
              <Route path="/articles/:slug/" component={ArticleDetailPage}/>
            </Switch>
          </>
        </ConnectedRouter>
      </Provider>
    )
  }
}
