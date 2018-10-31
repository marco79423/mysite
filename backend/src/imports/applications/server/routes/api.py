import flask
from flask import Blueprint

from imports.applications.server.domain_injector import domain_injector
from imports.domains.blog.use_cases.query_articles_use_case import QueryArticlesUseCase
from imports.domains.blog.use_cases.query_web_pages_use_case import QueryWebPagesUseCase

api_routes = Blueprint('api', __name__, url_prefix='/api')


@api_routes.route('/articles/')
def get_articles():
    uc = domain_injector.get(QueryArticlesUseCase)
    res = uc.execute()
    articles = res.data
    return flask.jsonify(articles)


@api_routes.route('/web_pages/')
def get_web_pages():
    uc = domain_injector.get(QueryWebPagesUseCase)
    res = uc.execute()
    web_pages = res.data
    return flask.jsonify(web_pages)


@api_routes.route('/info/')
def get_info():
    return flask.jsonify({
        'version': '0.0.0',
    })
