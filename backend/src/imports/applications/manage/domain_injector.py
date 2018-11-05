import injector


def mapping_blog_domain(binder):
    from imports.domains.blog.repositories import SiteInfoRepository
    from imports.domains.blog.repositories import WebPageRepository, AssetRepository, ArticleRepository
    from imports.domains.blog.services import AssetService, PathService, SlugService, TruncateHTMLService, EnvService, \
        TimeService
    from imports.infrastructure.blog.repository.article_repository_impl import ArticleRepositoryImpl
    from imports.infrastructure.blog.repository.asset_repository_impl import AssetRepositoryImpl
    from imports.infrastructure.blog.repository.site_info_repository_impl import SiteInfoRepositoryImpl
    from imports.infrastructure.blog.repository.web_page_repository_impl import WebPageRepositoryImpl
    from imports.infrastructure.blog.services.asset_service_impl import AssetServiceImpl
    from imports.infrastructure.blog.services.env_service_impl import EnvServiceImpl
    from imports.infrastructure.blog.services.path_service_impl import PathServiceImpl
    from imports.infrastructure.blog.services.slug_service_impl import SlugServiceImpl
    from imports.infrastructure.blog.services.time_service_impl import TimeServiceImpl
    from imports.infrastructure.blog.services.truncate_html_service_impl import TruncateHTMLServiceImpl

    binder.bind(EnvService, to=EnvServiceImpl)
    binder.bind(TimeService, to=TimeServiceImpl)
    binder.bind(PathService, to=PathServiceImpl)
    binder.bind(SlugService, to=SlugServiceImpl)
    binder.bind(AssetService, to=AssetServiceImpl)
    binder.bind(TruncateHTMLService, to=TruncateHTMLServiceImpl)

    binder.bind(SiteInfoRepository, to=SiteInfoRepositoryImpl)
    binder.bind(WebPageRepository, to=WebPageRepositoryImpl)
    binder.bind(AssetRepository, to=AssetRepositoryImpl)
    binder.bind(ArticleRepository, to=ArticleRepositoryImpl)


def mapping_rst_parser_domain(binder):
    from imports.domains.rst_parser.services import PathService, TransformRstService
    from imports.infrastructure.rst_parser.services.path_service_impl import PathServiceImpl
    from imports.infrastructure.rst_parser.services.transform_rst_service_impl import TransformRstServiceImpl

    binder.bind(PathService, to=PathServiceImpl)

    binder.bind(TransformRstService, to=TransformRstServiceImpl)


domain_injector = injector.Injector([mapping_blog_domain, mapping_rst_parser_domain])
