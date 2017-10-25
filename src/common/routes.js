import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import BaseContainer from './blog/BaseContainer'
import ArticleListContainer from './blog/scenes/article-list'
import CategorizedArticleListContainer from './blog/scenes/categorized-article-list'
import ArticleDetailContainer from './blog/scenes/article-detail'
import ArchivesContainer from './blog/scenes/archives'
import SiteInfoContainer from './blog/scenes/site-info'
import PageContainer from './blog/scenes/page'
import LabContainer from './blog/scenes/lab'


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
      <Route path='/articles/:slug/' component={ArticleDetailContainer}/>
      <Route path='/:app/:slug/' component={PageContainer}/>
    </Route>
  </Router>
)
