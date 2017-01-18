from __future__ import print_function
from StringIO import StringIO

from fabric.api import *
from fabric.colors import cyan
from fabric.contrib.files import exists, sed


PROJECT_PATH = '/var/www/mysite-backend'


@task
def deploy(branch='master'):
    update_sys()
    upload_proj(branch)
    install_pkgs()
    setup_proj()
    test_proj()
    build_content()
    setup_serv()
    restart_serv()


@task
def update_sys():
    sudo('apt-get update --fix-missing')
    sudo('apt-get upgrade -y ')


@task
def upload_proj(branch):
    if exists(PROJECT_PATH):
        sudo('rm -rf {}'.format(PROJECT_PATH))

    sudo('mkdir -p {}'.format(PROJECT_PATH))
    archive = local('git archive --format=tar {} | gzip'.format(branch), capture=True)
    with cd(PROJECT_PATH):
        put(StringIO(archive), 'temp.tar.gz', use_sudo=True)
        sudo('tar zxf temp.tar.gz')
        sudo('rm temp.tar.gz')
        sudo('chown -R www-data:www-data .')


@task
def install_pkgs():
    print(cyan('Install python and associated packages...'))
    sudo('apt-get install -y python3.4')
    sudo('apt-get install -y python3-pip')

    sudo('pip3 install pip --upgrade')
    sudo('pip3 install virtualenv')

    # for pillow
    sudo('apt-get install -y libtiff5-dev')
    sudo('apt-get install -y libjpeg8-dev')
    sudo('apt-get install -y zlib1g-dev')
    sudo('apt-get install -y libfreetype6-dev')
    sudo('apt-get install -y liblcms2-dev')
    sudo('apt-get install -y libwebp-dev')
    sudo('apt-get install -y tcl8.6-dev')
    sudo('apt-get install -y python-tk')

    print(cyan('Install http server ...'))
    sudo('apt-get install -y nginx')


@task
def setup_proj():
    with cd(PROJECT_PATH):
        sudo('virtualenv venv -p python3')
        sudo('venv/bin/pip install -r requirements.txt')
        sudo('chown -R www-data:www-data venv')

        print(cyan('Prepare project ...'))
        sudo('venv/bin/python manage.py migrate')
        sudo('venv/bin/python manage.py collectstatic --noinput')

        print(cyan('Changing setting for production ...'))
        sed('mysite/settings.py', 'DEBUG = True', 'DEBUG = False', shell=True, use_sudo=True)


@task
def test_proj():
    with cd(PROJECT_PATH):
        run("venv/bin/python manage.py test")


@task
def build_content():
    if not exists('/var/www/site-content'):
        sudo('git clone https://github.com/marco79423/mysite-content.git /var/www/site-content')
    else:
        with cd('/var/www/site-content'):
            sudo('git pull')

    with cd(PROJECT_PATH):
        sudo('venv/bin/python manage.py build /var/www/site-content')


@task
def setup_serv():
    sudo('locale-gen zh_TW.UTF-8')

    print(cyan('Setup gunicorn ...'))
    with cd(PROJECT_PATH):
        sudo('cp conf/init/mysite-backend.conf /etc/init')

    print(cyan('Setup nginx ...'))
    if exists('/etc/nginx/sites-enabled/default'):
        sudo('rm /etc/nginx/sites-enabled/default')

    with cd(PROJECT_PATH):
        sudo('cp conf/nginx/mysite-backend.conf /etc/nginx/sites-available')
    if not exists('/etc/nginx/sites-enabled/mysite-backend.conf'):
        sudo('ln -s /etc/nginx/sites-available/mysite-backend.conf mysite-backend.conf')


@task
def restart_serv():
    sudo('service mysite-backend restart')
    sudo('service nginx restart')
