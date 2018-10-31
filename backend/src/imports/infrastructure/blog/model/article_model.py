from imports.infrastructure.blog.model import db
from imports.infrastructure.blog.model.category_model import CategoryModel

categories = db.Table('categories',
                      db.Column('article_id', db.Integer, db.ForeignKey('article.id'), primary_key=True),
                      db.Column('category_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
                      )


class ArticleModel(db.Model):
    __tablename__ = 'article'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    slug = db.Column(db.String(128), nullable=False, unique=True)
    title = db.Column(db.String(128), nullable=False, unique=True)
    date = db.Column(db.Date, nullable=False)
    modified_date = db.Column(db.Date, nullable=True)
    categories = db.relationship(CategoryModel, secondary=categories)
    chicken_count = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text, nullable=False)
    raw_summary = db.Column(db.Text, nullable=False)
