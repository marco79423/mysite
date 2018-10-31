import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.repositories import WebPageRepository


@injector.singleton
class QueryWebPagesUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, web_page_repo: WebPageRepository):
        self.web_page_repo = web_page_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        web_pages = self.web_page_repo.select_all()
        return Response([web_page.serialize() for web_page in web_pages])
