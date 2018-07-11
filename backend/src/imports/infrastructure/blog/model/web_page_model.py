from imports.infrastructure.blog.model import db


class WebPageModel(db.Model):
    __tablename__ = 'web_page'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    app = db.Column(db.String(32), nullable=False)
    slug = db.Column(db.String(128), nullable=False, unique=True)
    title = db.Column(db.String(128), nullable=False, unique=True)
    content = db.Column(db.Text, nullable=False)
