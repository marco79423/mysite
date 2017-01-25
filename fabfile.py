from __future__ import print_function
import json
from StringIO import StringIO

from fabric.api import *
from fabric.colors import cyan
from fabric.contrib.files import exists, sed


HOST_CONFIG_FILE = "hosts.json"

CONFIGS = {
    'prod': {
        'name': 'mysite-backend',
        'debug': False,
        'server_name': 'api.marco79423.net',
    },
    'dev': {
        'name': 'mysite-backend-dev',
        'debug': True,
        'server_name': 'api-dev.marco79423.net',
    }
}

with open(HOST_CONFIG_FILE) as fp:
    hosts_data = json.load(fp)
    env.hosts = hosts_data.get('hosts', [])
    env.key_filename = hosts_data.get('pem_file')


@task
def prod():
    env.update(CONFIGS['prod'])
    env.project_path = '/var/www/' + env.name


@task
def dev():
    env.update(CONFIGS['dev'])
    env.project_path = '/var/www/' + env.name


@task
def deploy(branch='master'):
    update_sys()
    _upload_proj(branch)
    _install_pkgs()
    _setup_proj()
    _test_proj()
    build_content()
    _setup_serv()
    restart_serv()


@task
def update_sys():
    sudo('apt-get update --fix-missing')
    sudo('apt-get upgrade -y ')


@task
def build_content():
    if not exists('/var/www/site-content'):
        sudo('git clone https://github.com/marco79423/mysite-content.git /var/www/site-content')
    else:
        with cd('/var/www/site-content'):
            sudo('git pull')

    with cd(env.project_path):
        sudo('venv/bin/python manage.py build /var/www/site-content')


@task
def restart_serv():
    sudo('service {name} restart'.format(name=env.name))
    sudo('service nginx restart')


#################
# private tasks #
#################

@task
def _upload_proj(branch):
    if exists(env.project_path):
        sudo('rm -rf {}'.format(env.project_path))

    sudo('mkdir -p {}'.format(env.project_path))
    archive = local('git archive --format=tar {} | gzip'.format(branch), capture=True)
    with cd(env.project_path):
        put(StringIO(archive), 'temp.tar.gz', use_sudo=True)
        sudo('tar zxf temp.tar.gz')
        sudo('rm temp.tar.gz')
        sudo('chown -R www-data:www-data .')


@task
def _install_pkgs():
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
def _setup_proj():
    with cd(env.project_path):
        sudo('virtualenv venv -p python3')
        sudo('venv/bin/pip install -r requirements.txt')
        sudo('chown -R www-data:www-data venv')

        print(cyan('Prepare project ...'))
        sudo('venv/bin/python manage.py migrate')
        sudo('venv/bin/python manage.py collectstatic --noinput')

        if not env.debug:
            print(cyan('Changing setting for production ...'))
            sed('mysite/settings.py', 'DEBUG = True', 'DEBUG = False', shell=True, use_sudo=True)


@task
def _test_proj():
    with cd(env.project_path):
        run("venv/bin/python manage.py test")


@task
def _setup_serv():
    sudo('locale-gen zh_TW.UTF-8')

    filename = env.name + '.conf'

    print(cyan('Setup gunicorn ...'))
    config_path = '/etc/init/' + filename
    with cd(env.project_path):
        sudo('cp conf/init/service.conf ' + config_path)
        sed(config_path, 'TARGET_NAME', env.name, shell=True, use_sudo=True)

    print(cyan('Setup nginx ...'))
    if exists('/etc/nginx/sites-enabled/default'):
        sudo('rm /etc/nginx/sites-enabled/default')

    config_path = '/etc/nginx/sites-available/' + filename
    with cd(env.project_path):
        sudo('cp conf/nginx/nginx.conf ' + config_path)
        sed(config_path, 'TARGET_NAME', env.name, shell=True, use_sudo=True)
        sed(config_path, 'SERVER_NAME', env.server_name, shell=True, use_sudo=True)

    with cd('/etc/nginx/sites-enabled'):
        if exists(filename):
            sudo('rm ' + filename)
        sudo('ln -s {config_path} {filename}'.format(config_path=config_path, filename=filename))


