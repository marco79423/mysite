from imports.infrastructure.blog.model import db


class AssetModel(db.Model):
    __tablename__ = 'asset'

    uuid = db.Column(db.String(64), primary_key=True)
    is_attachment = db.Column(db.Boolean, default=False, nullable=False)
    filename = db.Column(db.String(120), nullable=False)
    data = db.Column(db.Binary, nullable=False)
