from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    # configuration
    from imports.applications.server import config
    app.config.from_object(config)

    # 3rd party modules
    CORS(app)

    from imports.infrastructure.blog.model import db
    db.init_app(app)

    # routing
    from imports.applications.server.routes.default import default_routes
    from imports.applications.server.routes.api import api_routes

    app.register_blueprint(default_routes)
    app.register_blueprint(api_routes)

    # initialization
    with app.app_context():
        db.create_all()

    return app
