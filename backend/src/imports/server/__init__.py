from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# WSGI application
from imports.server import config

app = Flask(__name__)

# configuration
app.config.from_object(config)

# 3rd party modules
CORS(app)
db = SQLAlchemy(app)

# routing
from imports.server.routes.default import default_routes
from imports.server.routes.api_v1 import api_v1_routes

app.register_blueprint(default_routes)
app.register_blueprint(api_v1_routes)

# initialization
from imports.infrastructure.blog.model.category_model import CategoryModel
from imports.infrastructure.blog.model.article_model import ArticleModel

import datetime as dt

db.drop_all()


db.create_all()

c = CategoryModel(
    slug='category_model.slug',
    name='category_model.name'
)
db.session.add(c)

a = ArticleModel(
    slug='article_model.slug',
    title='title',
    date=dt.date(2011, 3, 3),
    categories=[c],
    chicken_count=3,
    content='article_model.content',
    summary='article_model.summary',
    raw_summary='article_model.raw_summary',
    modified_date=dt.date(2011, 3, 4),
)

db.session.add(a)
db.session.commit()
