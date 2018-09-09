import flask
from flask import Blueprint

from imports.domain_injector import domain_injector
from imports.domains.blog.use_cases.query_articles_use_case import QueryArticlesUseCase

api_v1_routes = Blueprint('api', __name__, url_prefix='/api/v1')


@api_v1_routes.route('/articles/')
def get_articles():
    uc = domain_injector.get(QueryArticlesUseCase)
    res = uc.execute()
    articles = res.data
    return flask.jsonify(articles)


@api_v1_routes.route('/web_pages/')
def get_web_pages():
    return flask.jsonify([])


@api_v1_routes.route('/info/')
def get_info():
    return flask.jsonify({
        'version': '0.0.0',
    })
