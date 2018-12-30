from unittest.mock import MagicMock

from imports.domains.blog.entities.asset import Asset
from imports.domains.blog.services.asset_service import AssetService


def test_save_and_return_static_url():
    asset_repo = MagicMock()

    config_adapter = MagicMock()
    config_adapter.get_base_static_url.return_value = 'base_static_url/'

    identity_adapter = MagicMock()
    identity_adapter.generate.return_value = 'identity'

    asset_serv = AssetService(
        asset_repo=asset_repo,
        config_adapter=config_adapter,
        identity_adapter=identity_adapter,
    )

    static_url = asset_serv.save_and_return_static_url(
        filename='filename',
        data='data',
        is_attachment=True,
    )

    asset_repo.add.assert_called_with(Asset(
        uuid='identity',
        is_attachment=True,
        filename='filename',
        data='data',
    ))

    assert static_url == 'base_static_url/identity/'
