import injector


def mapping_blog_domain(binder):
    from imports.domains.blog.repositories import AssetRepository, ArticleRepository, WebPageRepository
    from imports.infrastructure.blog.repository.article_repository_impl import ArticleRepositoryImpl
    from imports.infrastructure.blog.repository.web_page_repository_impl import WebPageRepositoryImpl
    from imports.infrastructure.blog.repository.asset_repository_impl import AssetRepositoryImpl

    binder.bind(AssetRepository, to=AssetRepositoryImpl)
    binder.bind(ArticleRepository, to=ArticleRepositoryImpl)
    binder.bind(WebPageRepository, to=WebPageRepositoryImpl)


domain_injector = injector.Injector(mapping_blog_domain)
