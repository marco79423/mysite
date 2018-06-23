import subprocess
import sys


def call(cmd, ignore_error=False):
    status = subprocess.call(cmd, shell=True)
    if not ignore_error and status != 0:
        print("*** FAIL --> {} {} ***".format(status, cmd))
        sys.exit(status)


call('python manage.py migrate')
call('python manage.py build /content')
call('gunicorn mysite_backend.wsgi:application -b :8000')
