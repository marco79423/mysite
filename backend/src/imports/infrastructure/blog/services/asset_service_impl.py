import uuid

import injector

from imports.applications.manage import config
from imports.domains.blog.entities.asset import Asset
from imports.domains.blog.repositories import AssetRepository
from imports.domains.blog.services import AssetService


@injector.singleton
class AssetServiceImpl(AssetService):

    @injector.inject
    def __init__(self, asset_repo: AssetRepository):
        self.asset_repo = asset_repo

    def save_and_return_static_url(self, filename: str, data: str, is_attachment: bool) -> str:
        file_uuid = str(uuid.uuid1())
        self.asset_repo.add(Asset(
            uuid=file_uuid,
            is_attachment=is_attachment,
            filename=filename,
            data=data,
        ))
        return self._generate_static_url(file_uuid)

    @staticmethod
    def _generate_static_url(item_uuid):
        return '{}{}/'.format(config.STATIC_URL, item_uuid)
