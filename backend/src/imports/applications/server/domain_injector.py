import injector


def mapping_blog_domain(binder):
    from imports.domains.blog.repositories import AssetRepository, ArticleRepository, WebPageRepository, \
        SiteInfoRepository
    from imports.infrastructure.domains.blog.repository.article_repository_impl import ArticleRepositoryImpl
    from imports.infrastructure.domains.blog.repository.site_info_repository_impl import SiteInfoRepositoryImpl
    from imports.infrastructure.domains.blog.repository.web_page_repository_impl import WebPageRepositoryImpl
    from imports.infrastructure.domains.blog.repository.asset_repository_impl import AssetRepositoryImpl

    binder.bind(ArticleRepository, to=ArticleRepositoryImpl)
    binder.bind(SiteInfoRepository, to=SiteInfoRepositoryImpl)
    binder.bind(WebPageRepository, to=WebPageRepositoryImpl)
    binder.bind(AssetRepository, to=AssetRepositoryImpl)


domain_injector = injector.Injector(mapping_blog_domain)
