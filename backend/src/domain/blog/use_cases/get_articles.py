import typing

import injector

from domain import base_types
from domain.base_types import Request, Response, ResponseError
from domain.blog.models.article import Article, Type
from domain.blog.repositories.article_repository import ArticleRepository


@injector.singleton
class GetArticlesUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, article_repo: ArticleRepository):
        self.article_repo = article_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        if request and request.data['type'] == 'normal':
            article_type = Type.NORMAL
        elif request and request.data['type'] == 'web_page':
            article_type = Type.WEB_PAGE
        else:
            return ResponseError('Required valid article type')

        articles: [Article] = self.article_repo.get_by_type(type=article_type)
        return Response([article.serialize() for article in articles])
