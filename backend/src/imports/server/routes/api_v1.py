import flask
from flask import Blueprint

api_v1_routes = Blueprint('api', __name__, url_prefix='/api/v1')


@api_v1_routes.route('/articles/')
def get_articles():
    return flask.jsonify([])


@api_v1_routes.route('/web_pages/')
def get_web_pages():
    return flask.jsonify([])


@api_v1_routes.route('/info/')
def get_info():
    return flask.jsonify({
        'version': '0.0.0',
    })
