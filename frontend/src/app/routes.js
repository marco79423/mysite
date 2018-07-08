const routes = module.exports = require('next-routes')()

routes
  .add('/', 'ArticleListPage')

  .add('/articles/pages/:pageNum/', 'ArticleListPage')
  .add('/articles/category/:category/', 'ArticleListPage')
  .add('/articles/category/:category/page/:pageNum/', 'ArticleListPage')

  .add('/articles/:slug/', 'ArticleDetailPage')

  .add('/articles/archives/', 'ArchivesPage')

  .add('/me/:slug/', 'MePage')

  .add('/lab/', 'LabPage')
  .add('/info/', 'SiteInfoPage')
