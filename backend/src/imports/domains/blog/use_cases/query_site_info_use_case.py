import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.repositories import SiteInfoRepository


@injector.singleton
class QuerySiteInfoUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, site_info_repo: SiteInfoRepository):
        self.site_info_repo = site_info_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        site_info = self.site_info_repo.select_one()
        return Response(site_info.serialize())
