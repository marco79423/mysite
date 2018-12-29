import injector

from imports.domains.base_types import Service
from imports.domains.blog.adapters import IdentityAdapter, ConfigAdapter
from imports.domains.blog.entities.asset import Asset
from imports.domains.blog.repositories import AssetRepository


@injector.singleton
class AssetService(Service):

    @injector.inject
    def __init__(self, asset_repo: AssetRepository, config_adapter: ConfigAdapter, identity_adapter: IdentityAdapter):
        self.asset_repo = asset_repo
        self.config_adapter = config_adapter
        self.identity_adapter = identity_adapter

    def save_and_return_static_url(self, filename: str, data: str, is_attachment: bool) -> str:
        identity = self.identity_adapter.generate()
        self._save_to_repository(Asset(
            uuid=identity,
            is_attachment=is_attachment,
            filename=filename,
            data=data,
        ))
        return self._generate_static_url(identity)

    def _save_to_repository(self, asset: Asset) -> None:
        return self.asset_repo.add(asset)

    def _generate_static_url(self, identity):
        return '{}{}/'.format(self.config_adapter.get_base_static_url(), identity)
