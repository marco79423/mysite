import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import BaseContainer from './containers/base'
import ArticleListContainer from './containers/article-list'
import CategorizedArticleListContainer from './containers/categorized-article-list'
import ArticleContainer from './containers/article'
import ArchivesContainer from './containers/archives'
import SiteInfoContainer from './containers/site-info'
import PageContainer from './containers/page'
import LabContainer from './containers/lab'

export const createRoutes = (history) => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={BaseContainer}>
      <IndexRoute component={ArticleListContainer}/>
      <Route path='/lab/' component={LabContainer}/>
      <Route path='/info/' component={SiteInfoContainer}/>
      <Route path='/articles/page/:pageNum/' component={ArticleListContainer}/>
      <Route path='/articles/category/:category/' component={CategorizedArticleListContainer}/>
      <Route path='/articles/category/:category/page/:pageNum/' component={CategorizedArticleListContainer}/>
      <Route path='/articles/archives/' component={ArchivesContainer}/>
      <Route path='/articles/:slug/' component={ArticleContainer}/>
      <Route path='/:app/:slug/' component={PageContainer}/>
    </Route>
  </Router>
)
