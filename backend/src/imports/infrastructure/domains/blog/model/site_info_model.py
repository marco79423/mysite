from imports.infrastructure.domains.blog.model import db


class SiteInfoModel(db.Model):
    __tablename__ = 'site_info'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    updated_time = db.Column(db.DateTime(timezone=True), nullable=False)
    repo_version = db.Column(db.String(128), nullable=False)
