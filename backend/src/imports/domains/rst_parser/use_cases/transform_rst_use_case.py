import typing

import injector

from imports.domains.base_types import UseCase, Request, Response, ResponseError
from imports.domains.rst_parser.adapters import PathAdapter, TransformRstAdapter


@injector.singleton
class TransformRstUseCase(UseCase):

    @injector.inject
    def __init__(self, path_adapter: PathAdapter, transform_rst_adapter: TransformRstAdapter):
        self.path_adapter = path_adapter
        self.transform_rst_adapter = transform_rst_adapter

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        if not request or not isinstance(request, Request):
            return ResponseError('A request is required')

        article_path = request.data
        if not isinstance(article_path, str):
            return ResponseError('Invalid input')

        if not self.path_adapter.exists(article_path):
            return ResponseError('article_path "{}" does not exist'.format(article_path))

        article = self.transform_rst_adapter.generate_article(article_path)

        return Response(article.serialize())
