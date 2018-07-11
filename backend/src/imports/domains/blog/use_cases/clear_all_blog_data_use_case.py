import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.repositories import ArticleRepository, WebPageRepository, AssetRepository


@injector.singleton
class ClearAllBlogDataUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, article_repo: ArticleRepository, web_page_repo: WebPageRepository, asset_repo: AssetRepository):
        self.article_repo = article_repo
        self.web_page_repo = web_page_repo
        self.asset_repo = asset_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        try:
            self.article_repo.clear()
            self.web_page_repo.clear()
            self.asset_repo.clear()
            return Response()
        except Exception as e:
            return ResponseError(str(e))
