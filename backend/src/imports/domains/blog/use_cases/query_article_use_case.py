import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.repositories import ArticleRepository


@injector.singleton
class QueryArticleUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, article_repo: ArticleRepository):
        self.article_repo = article_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        if not request or not isinstance(request, Request):
            return ResponseError('A request is required')

        article_slug = request.data
        if not isinstance(article_slug, str):
            return ResponseError('Invalid input')

        article = self.article_repo.select_by_slug(article_slug)
        if not article:
            return Response()

        return Response(article.serialize())
