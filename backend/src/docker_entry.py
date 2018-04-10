import argparse
import os
import subprocess
import sys


def call(cmd, ignore_error=False):
    status = subprocess.call(cmd, shell=True)
    if not ignore_error and status != 0:
        print("*** FAIL --> {} {} ***".format(status, cmd))
        sys.exit(status)


parser = argparse.ArgumentParser()
parser.add_argument("operation",
                    choices=['main', 'celery-worker', 'celery-beat'],
                    default='main')

args = parser.parse_args()
if args.operation == 'main':
    call('python manage.py migrate')
    call('python manage.py collectstatic --no-input')
    call('gunicorn mysite_backend.wsgi:application -b :8000')
elif args.operation == 'celery-worker':
    os.environ['C_FORCE_ROOT'] = '1'
    call('python manage.py celery worker --events --loglevel=INFO --logfile=/logs/celery-worker.log')
elif args.operation == 'celery-beat':
    os.environ['C_FORCE_ROOT'] = '1'
    call('rm -f celery-beat.pid')
    call('python manage.py celery beat --pidfile celery-beat.pid --loglevel=INFO --logfile=/logs/celery-beat.log')
