import injector

from imports.domains.blog.repositories import ArticleRepository
from imports.infrastructure.blog.repository.article_repository_impl import ArticleRepositoryImpl


def mapping_blog_domain(binder):
    binder.bind(ArticleRepository, to=ArticleRepositoryImpl)


domain_injector = injector.Injector(mapping_blog_domain)
