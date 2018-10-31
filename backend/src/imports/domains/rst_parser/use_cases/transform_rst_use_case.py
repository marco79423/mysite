import typing

import injector

from imports.domains.base_types import UseCase, Request, Response, ResponseError
from imports.domains.rst_parser.services import PathService, TransformRstService


@injector.singleton
class TransformRstUseCase(UseCase):

    @injector.inject
    def __init__(self, path_serv: PathService, transform_rst_serv: TransformRstService):
        self.path_serv = path_serv
        self.transform_rst_serv = transform_rst_serv

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        if not request or not isinstance(request, Request):
            return ResponseError('A request is required')

        article_path = request.data
        if not isinstance(article_path, str):
            return ResponseError('Invalid input')

        if not self.path_serv.exists(article_path):
            return ResponseError('article_path "{}" does not exist'.format(article_path))

        article = self.transform_rst_serv.generate_article(article_path)

        return Response(article.serialize())
