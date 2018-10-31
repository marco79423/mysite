import os

STATIC_URL = os.environ.get('STATIC_URL', 'http://localhost:8000/static/')
MAX_SUMMARY_LENGTH = 15
