import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import AppLayoutContainer from './blog/AppLayoutContainer'
import ArticleListContainer from './blog/pages/article-list'
import CategorizedArticleListContainer from './blog/pages/categorized-article-list'
import ArticleDetailContainer from './blog/pages/article-detail'
import ArchivesContainer from './blog/pages/archives'
import SiteInfoContainer from './blog/pages/site-info'
import PageContainer from './blog/pages/page'
import LabContainer from './blog/pages/lab'


export const createRoutes = (history) => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={AppLayoutContainer}>
      <IndexRoute component={ArticleListContainer}/>
      <Route path='/lab/' component={LabContainer}/>
      <Route path='/info/' component={SiteInfoContainer}/>
      <Route path='/articles/page/:pageNum/' component={ArticleListContainer}/>
      <Route path='/articles/category/:category/' component={CategorizedArticleListContainer}/>
      <Route path='/articles/category/:category/page/:pageNum/' component={CategorizedArticleListContainer}/>
      <Route path='/articles/archives/' component={ArchivesContainer}/>
      <Route path='/articles/:slug/' component={ArticleDetailContainer}/>
      <Route path='/:app/:slug/' component={PageContainer}/>
    </Route>
  </Router>
)
