import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.repositories import ArticleRepository


@injector.singleton
class QueryArticlesUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, article_repo: ArticleRepository):
        self.article_repo = article_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        articles = self.article_repo.select_all()
        return Response([article.serialize() for article in articles])
