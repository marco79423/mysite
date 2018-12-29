import injector


def mapping_blog_domain(binder):
    from imports.domains.blog.repositories import SiteInfoRepository
    from imports.domains.blog.repositories import WebPageRepository, AssetRepository, ArticleRepository
    from imports.domains.blog.adapters import SlugAdapter, IdentityAdapter, PathAdapter, ConfigAdapter, EnvAdapter, \
        TruncateHTMLAdapter, TimeAdapter
    from imports.infrastructure.blog.repository.article_repository_impl import ArticleRepositoryImpl
    from imports.infrastructure.blog.repository.asset_repository_impl import AssetRepositoryImpl
    from imports.infrastructure.blog.repository.site_info_repository_impl import SiteInfoRepositoryImpl
    from imports.infrastructure.blog.repository.web_page_repository_impl import WebPageRepositoryImpl
    from imports.infrastructure.blog.adapters.slug_adapter_impl import SlugAdapterImpl
    from imports.infrastructure.blog.adapters.config_adapter_impl import ConfigAdapterImpl
    from imports.infrastructure.blog.adapters.env_adapter_impl import EnvAdapterImpl
    from imports.infrastructure.blog.adapters.identity_adapter_impl import IdentityAdapterImpl
    from imports.infrastructure.blog.adapters.path_adapter_impl import PathAdapterImpl
    from imports.infrastructure.blog.adapters.time_adapter_impl import TimeAdapterImpl
    from imports.infrastructure.blog.adapters.truncate_html_adapter_impl import TruncateHTMLAdapterImpl

    binder.bind(ConfigAdapter, to=ConfigAdapterImpl)
    binder.bind(EnvAdapter, to=EnvAdapterImpl)
    binder.bind(IdentityAdapter, to=IdentityAdapterImpl)
    binder.bind(PathAdapter, to=PathAdapterImpl)
    binder.bind(SlugAdapter, to=SlugAdapterImpl)
    binder.bind(TimeAdapter, to=TimeAdapterImpl)
    binder.bind(TruncateHTMLAdapter, to=TruncateHTMLAdapterImpl)

    binder.bind(SiteInfoRepository, to=SiteInfoRepositoryImpl)
    binder.bind(WebPageRepository, to=WebPageRepositoryImpl)
    binder.bind(AssetRepository, to=AssetRepositoryImpl)
    binder.bind(ArticleRepository, to=ArticleRepositoryImpl)


def mapping_rst_parser_domain(binder):
    from imports.domains.rst_parser.services import PathService, TransformRstService
    from imports.domains.blog.adapters import PathAdapter
    from imports.infrastructure.rst_parser.services.path_service_impl import PathServiceImpl
    from imports.infrastructure.rst_parser.services.transform_rst_service_impl import TransformRstServiceImpl
    from imports.infrastructure.blog.adapters.path_adapter_impl import PathAdapterImpl

    binder.bind(PathService, to=PathServiceImpl)

    binder.bind(PathAdapter, to=PathAdapterImpl)

    binder.bind(TransformRstService, to=TransformRstServiceImpl)


domain_injector = injector.Injector([mapping_blog_domain, mapping_rst_parser_domain])
