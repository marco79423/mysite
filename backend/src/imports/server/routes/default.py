from flask import redirect, Blueprint

default_routes = Blueprint('default', __name__, url_prefix='/')


@default_routes.route('/api/<path:path>')
def redirect_api(path):
    return redirect('/api/v1/{}'.format(path))
