from unittest.mock import MagicMock

from imports.domains.base_types import ResponseError, Request, Response
from imports.domains.blog.use_cases.query_asset_use_case import QueryAssetUseCase


def test_invalid_input():
    uc = QueryAssetUseCase(
        asset_repo=MagicMock(),
    )

    res = uc.execute()
    assert isinstance(res, ResponseError)
    assert res.reason == 'A request is required'

    uc = QueryAssetUseCase(
        asset_repo=MagicMock(),
    )
    res = uc.execute(Request())
    assert isinstance(res, ResponseError)
    assert res.reason == 'Invalid input'

    asset_repo = MagicMock()
    asset_repo.select_by_uuid.return_value = None

    uc = QueryAssetUseCase(
        asset_repo=asset_repo,
    )
    res = uc.execute(Request('invalid_uuid'))

    assert isinstance(res, ResponseError)
    assert res.reason == 'Target asset not found'


def test_query_asset():
    asset = MagicMock()
    asset.serialize.return_value = 'asset'

    asset_repo = MagicMock()
    asset_repo.select_by_uuid.return_value = asset

    uc = QueryAssetUseCase(
        asset_repo=asset_repo,
    )
    res = uc.execute(Request('uuid'))

    assert isinstance(res, Response)
    assert res.data == 'asset'
