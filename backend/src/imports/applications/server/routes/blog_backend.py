import io

import flask
from flask import Blueprint, send_file

from imports.applications.server.domain_injector import domain_injector
from imports.domains.base_types import Request
from imports.domains.blog.use_cases.query_articles_use_case import QueryArticlesUseCase
from imports.domains.blog.use_cases.query_asset_use_case import QueryAssetUseCase
from imports.domains.blog.use_cases.query_site_info_use_case import QuerySiteInfoUseCase
from imports.domains.blog.use_cases.query_web_pages_use_case import QueryWebPagesUseCase

blog_backend_routes = Blueprint('blog_backend', __name__, url_prefix='/backend')


@blog_backend_routes.route('/api/articles/')
def get_articles():
    uc = domain_injector.get(QueryArticlesUseCase)
    res = uc.execute()
    articles = res.data

    return flask.jsonify({
        'data': articles
    })


@blog_backend_routes.route('/api/web_pages/')
def get_web_pages():
    uc = domain_injector.get(QueryWebPagesUseCase)
    res = uc.execute()
    web_pages = res.data

    return flask.jsonify({
        'data': web_pages
    })


@blog_backend_routes.route('/api/info/')
def get_info():
    uc = domain_injector.get(QuerySiteInfoUseCase)
    res = uc.execute()
    site_info = res.data

    return flask.jsonify({
        'data': site_info
    })


@blog_backend_routes.route('/static/<uuid>/')
def get_static_file(uuid):
    uc = domain_injector.get(QueryAssetUseCase)
    res = uc.execute(Request(uuid))
    if not res:
        return res.reason, 400

    asset = res.data
    return send_file(
        io.BytesIO(asset['data']),
        as_attachment=asset['isAttachment'],
        attachment_filename=asset['filename'],
    )
