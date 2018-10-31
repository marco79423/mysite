import io

from flask import redirect, Blueprint, send_file

from imports.applications.server.domain_injector import domain_injector
from imports.domains.base_types import Request
from imports.domains.blog.use_cases.query_asset_use_case import QueryAssetUseCase

default_routes = Blueprint('default', __name__, url_prefix='/')


@default_routes.route('/static/<uuid>/')
def get_static_file(uuid):
    uc = domain_injector.get(QueryAssetUseCase)
    res = uc.execute(Request(uuid))
    if not res:
        return res.reason, 400

    asset = res.data
    return send_file(
        io.BytesIO(asset['data']),
        as_attachment=asset['is_attachment'],
        attachment_filename=asset['filename'],
    )
