import injector

from imports.domains.blog.repositories import ArticleRepository, WebPageRepository
from imports.infrastructure.blog.repository.article_repository_impl import ArticleRepositoryImpl
from imports.infrastructure.blog.repository.web_page_repository_impl import WebPageRepositoryImpl


def mapping_blog_domain(binder):
    binder.bind(ArticleRepository, to=ArticleRepositoryImpl)
    binder.bind(WebPageRepository, to=WebPageRepositoryImpl)


domain_injector = injector.Injector(mapping_blog_domain)
