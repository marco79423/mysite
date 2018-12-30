from imports.infrastructure.domains.blog.model import db


class CategoryModel(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    slug = db.Column(db.String(128), nullable=False, unique=True)
    name = db.Column(db.String(128), nullable=False, unique=True)
