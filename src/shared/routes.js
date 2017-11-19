import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import ArticleListPage from './blog/pages/ArticleListPage'
import CategorizedArticleListPage from './blog/pages/CategorizedArticleListPage'
import ArticleDetailPage from './blog/pages/ArticleDetailPage'
import ArchivesPage from './blog/pages/ArchivesPage'
import SiteInfoPage from './blog/pages/SiteInfoPage'
import PagePage from './blog/pages/PagePage'
import LabPage from './blog/pages/LabPage'


export const createRoutes = (history) => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path='/' component={ArticleListPage}/>
    <Route path='/lab/' component={LabPage}/>
    <Route path='/info/' component={SiteInfoPage}/>
    <Route path='/articles/page/:pageNum/' component={ArticleListPage}/>
    <Route path='/articles/category/:category/' component={CategorizedArticleListPage}/>
    <Route path='/articles/category/:category/page/:pageNum/' component={CategorizedArticleListPage}/>
    <Route path='/articles/archives/' component={ArchivesPage}/>
    <Route path='/articles/:slug/' component={ArticleDetailPage}/>
    <Route path='/:app/:slug/' component={PagePage}/>
  </Router>
)
