from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    # configuration
    from imports.applications.server import config
    app.config.from_object(config)

    # 3rd party modules
    CORS(app)

    from imports.infrastructure.domains.blog.model import db
    db.init_app(app)

    # routing
    from imports.applications.server.routes.blog_backend import blog_backend_routes

    app.register_blueprint(blog_backend_routes)

    # initialization
    with app.app_context():
        db.create_all()

    return app
