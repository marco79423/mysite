import os

SQLALCHEMY_TRACK_MODIFICATIONS = False

SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'sqlite:///./mysite.db')
