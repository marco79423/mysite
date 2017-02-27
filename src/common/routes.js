import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'

import Base from './containers/base'
import ArticleList from './containers/article-list'
import Article from './containers/article'
import Archives from './containers/archives'
import Page from './containers/page'


export const createRoutes = (history) => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={Base}>
      <IndexRoute component={ArticleList}/>
      <Route path='/articles/page/:pageNum/' component={ArticleList}/>
      <Route path='/articles/category/:category/' component={ArticleList}/>
      <Route path='/articles/category/:category/page/:pageNum/' component={ArticleList}/>
      <Route path='/articles/archives/' component={Archives}/>
      <Route path='/articles/:slug/' component={Article}/>
      <Route path='/:app/:slug/' component={Page}/>
    </Route>
  </Router>
)
