import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'

import Base from './containers/base'
import ArticleList from './containers/article-list'
import CategorizedArticleList from './containers/categorized-article-list'
import Article from './containers/article'
import Archives from './containers/archives'
import SiteInfo from './containers/site-info'
import Page from './containers/page'

export const createRoutes = (history) => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={Base}>
      <IndexRoute component={ArticleList}/>
      <Route path='/info/' component={SiteInfo}/>
      <Route path='/articles/page/:pageNum/' component={ArticleList}/>
      <Route path='/articles/category/:category/' component={CategorizedArticleList}/>
      <Route path='/articles/category/:category/page/:pageNum/' component={CategorizedArticleList}/>
      <Route path='/articles/archives/' component={Archives}/>
      <Route path='/articles/:slug/' component={Article}/>
      <Route path='/:app/:slug/' component={Page}/>
    </Route>
  </Router>
)
