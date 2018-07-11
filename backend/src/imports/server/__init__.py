from flask import Flask

# WSGI application
app = Flask(__name__)

# routing
from imports.server.routes.default import default_routes
from imports.server.routes.api_v1 import api_v1_routes

app.register_blueprint(default_routes)
app.register_blueprint(api_v1_routes)
