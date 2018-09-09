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
db.create_all()
