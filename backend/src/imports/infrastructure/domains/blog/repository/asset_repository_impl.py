import typing

import injector

from imports.domains.blog.entities.asset import Asset
from imports.domains.blog.repositories import AssetRepository
from imports.infrastructure.domains.blog.model import db
from imports.infrastructure.domains.blog.model.asset_model import AssetModel


@injector.singleton
class AssetRepositoryImpl(AssetRepository):

    def select_by_uuid(self, uuid: str) -> typing.Union[Asset, None]:
        asset_model = db.session.query(AssetModel).filter_by(uuid=uuid).first()
        if not asset_model:
            return None
        return Asset(
            uuid=asset_model.uuid,
            is_attachment=asset_model.is_attachment,
            filename=asset_model.filename,
            data=asset_model.data,
        )

    def add(self, asset: Asset) -> None:
        db.session.add(AssetModel(
            uuid=asset.uuid,
            is_attachment=asset.is_attachment,
            filename=asset.filename,
            data=asset.data,
        ))
        db.session.commit()

    def clear(self) -> None:
        db.session.query(AssetModel).delete()
        db.session.commit()
