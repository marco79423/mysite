import dateutil.tz
import injector

from imports.domains.blog.entities.site_info import SiteInfo
from imports.domains.blog.repositories import SiteInfoRepository
from imports.infrastructure.domains.blog.model import db
from imports.infrastructure.domains.blog.model.site_info_model import SiteInfoModel


@injector.singleton
class SiteInfoRepositoryImpl(SiteInfoRepository):

    def select_one(self) -> SiteInfo:
        site_info_model = db.session.query(SiteInfoModel).first()
        if site_info_model:
            return SiteInfo(
                updated_time=site_info_model.updated_time.replace(tzinfo=dateutil.tz.tzutc()),
                repo_version=site_info_model.repo_version,
            )

    def add(self, site_info: SiteInfo):
        db.session.add(SiteInfoModel(
            updated_time=site_info.updated_time,
            repo_version=site_info.repo_version,
        ))
        db.session.commit()

    def clear(self) -> None:
        db.session.query(SiteInfoModel).delete()
        db.session.commit()
