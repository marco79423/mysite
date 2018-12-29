import injector


def mapping_blog_domain(binder):
    from imports.domains.blog.repositories import SiteInfoRepository
    from imports.domains.blog.repositories import WebPageRepository, AssetRepository, ArticleRepository
    from imports.domains.blog.adapters import SlugAdapter, IdentityAdapter, PathAdapter, ConfigAdapter, EnvAdapter, \
        TruncateHTMLAdapter, TimeAdapter
    from imports.infrastructure.domains.blog.repository.article_repository_impl import ArticleRepositoryImpl
    from imports.infrastructure.domains.blog.repository.asset_repository_impl import AssetRepositoryImpl
    from imports.infrastructure.domains.blog.repository.site_info_repository_impl import SiteInfoRepositoryImpl
    from imports.infrastructure.domains.blog.repository.web_page_repository_impl import WebPageRepositoryImpl
    from imports.infrastructure.domains.blog.adapters.slug_adapter_impl import SlugAdapterImpl
    from imports.infrastructure.domains.blog.adapters.config_adapter_impl import ConfigAdapterImpl
    from imports.infrastructure.domains.blog.adapters.env_adapter_impl import EnvAdapterImpl
    from imports.infrastructure.domains.blog.adapters.identity_adapter_impl import IdentityAdapterImpl
    from imports.infrastructure.domains.blog.adapters.path_adapter_impl import PathAdapterImpl
    from imports.infrastructure.domains.blog.adapters.time_adapter_impl import TimeAdapterImpl
    from imports.infrastructure.domains.blog.adapters.truncate_html_adapter_impl import TruncateHTMLAdapterImpl

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
    from imports.domains.rst_parser.adapters import PathAdapter, TransformRstAdapter
    from imports.infrastructure.domains.rst_parser.adapters.transform_rst_adapter_impl import TransformRstAdapterImpl
    from imports.infrastructure.domains.rst_parser.adapters.path_adapter_impl import PathAdapterImpl

    binder.bind(PathAdapter, to=PathAdapterImpl)
    binder.bind(TransformRstAdapter, to=TransformRstAdapterImpl)


domain_injector = injector.Injector([mapping_blog_domain, mapping_rst_parser_domain])
