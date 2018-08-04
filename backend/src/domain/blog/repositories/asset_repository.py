import injector

from domain.base_types import Repository
from domain.blog.models.asset import Asset
from mysite_backend import settings


@injector.singleton
class AssetRepository(Repository):

    @staticmethod
    def get_base_url():
        return settings.HOST + settings.MEDIA_URL

    @staticmethod
    def add(asset: Asset) -> None:
        target_dir = settings.MEDIA_ROOT
        target_dir.makedirs_p()

        (target_dir / asset.filename).write_bytes(asset.data)

    @staticmethod
    def clean() -> None:
        settings.MEDIA_ROOT.rmtree_p()
