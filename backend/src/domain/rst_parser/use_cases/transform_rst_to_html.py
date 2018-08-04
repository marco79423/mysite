import typing

import injector

from domain import base_types
from domain.base_types import Request, Response, ResponseError
from domain.rst_parser.services.minify_html_service import MinifyHtmlService
from domain.rst_parser.services.transform_rst_service import TransformRstService


@injector.singleton
class TransformRstToHtmlUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, transform_rst_serv: TransformRstService, minify_html_serv: MinifyHtmlService):
        self.transform_rst_serv = transform_rst_serv
        self.minify_html_serv = minify_html_serv

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        article_path = request.data

        article = self.transform_rst_serv.generate_article(article_path)
        article.content = self.minify_html_serv.minify_html(article.content)

        return Response(article.serialize())
