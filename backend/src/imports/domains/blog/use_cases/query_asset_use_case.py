import typing

import injector

from imports.domains import base_types
from imports.domains.base_types import Request, Response, ResponseError
from imports.domains.blog.repositories import AssetRepository


@injector.singleton
class QueryAssetUseCase(base_types.UseCase):

    @injector.inject
    def __init__(self, asset_repo: AssetRepository):
        self.asset_repo = asset_repo

    def execute(self, request: Request = None) -> typing.Union[Response, ResponseError]:
        if not request or not isinstance(request, Request):
            return ResponseError('A request is required')

        asset_uuid = request.data
        if not isinstance(asset_uuid, str):
            return ResponseError('Invalid input')

        asset = self.asset_repo.select_by_uuid(asset_uuid)
        if not asset:
            return ResponseError('Target asset not found')

        return Response(asset.serialize())
