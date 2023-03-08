import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.repositories import ArticleRepository, AssetRepository, SiteInfoRepository


@injector.singleton
class ClearAllBlogDataUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self,
                 site_info_repo: SiteInfoRepository,
                 article_repo: ArticleRepository,
                 asset_repo: AssetRepository):
        self.site_info_repo = site_info_repo
        self.article_repo = article_repo
        self.asset_repo = asset_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        try:
            self.site_info_repo.clear()
            self.article_repo.clear()
            self.asset_repo.clear()
            return Response()
        except Exception as e:
            return ResponseError(str(e))
