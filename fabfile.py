from __future__ import print_function
import json
from StringIO import StringIO

from fabric.api import *
from fabric.colors import cyan
from fabric.contrib.files import exists, sed


PROJECT_CONFIG_FILE = "project_config.json"

CONFIGS = {
    'prod': {
        'name': 'mysite-backend',
        'default_branch': 'master',
        'debug': False,
        'server_name': 'api.marco79423.net',
    },
    'dev': {
        'name': 'mysite-backend-dev',
        'default_branch': 'HEAD',
        'debug': False,
        'server_name': 'api-dev.marco79423.net',
    }
}

with open(PROJECT_CONFIG_FILE) as fp:
    config = json.load(fp)
    env.hosts = config.get('hosts', [])
    env.key_filename = config.get('pem_file')
    env.secret_key = config.get('secret_key')


@task
def deploy(type_key='dev', branch=None):
    execute(update_sys)
    execute(_set_config, type_key, branch)
    execute(_upload_proj)
    execute(_install_pkgs)
    execute(_setup_proj)
    execute(_test_proj)
    execute(build_content)
    execute(_setup_serv)
    execute(restart_serv)


@task
def update_sys():
    sudo('apt-get update --fix-missing')
    sudo('apt-get upgrade -y ')


@task
def build_content():
    if not exists('/var/www/mysite-content'):
        sudo('git clone https://github.com/marco79423/mysite-content.git /var/www/mysite-content')
    else:
        with cd('/var/www/mysite-content'):
            sudo('git pull')

    with cd(env.config['source_path']):
        sudo('../venv/bin/python manage.py build /var/www/mysite-content')


@task
def restart_serv():
    sudo('service {name} restart'.format(name=env.config['name']))
    sudo('service nginx restart')


#################
# private tasks #
#################

@task
def _set_config(type_key, branch):
    env.config = CONFIGS[type_key]
    env.config['project_path'] = '/var/www/' + env.config['name']
    env.config['source_path'] = env.config['project_path'] + '/src'
    env.config['branch'] = branch if branch else env.config['default_branch']


@task
def _upload_proj():
    sudo('mkdir -p {}'.format(env.config['project_path']))
    archive = local('git archive --format=tar {} | gzip'.format(env.config['branch']), capture=True)
    with cd(env.config['project_path']):
        put(StringIO(archive), 'temp.tar.gz', use_sudo=True)
        sudo('tar zxf temp.tar.gz')
        sudo('rm temp.tar.gz')
        sudo('chown -R www-data:www-data .')


@task
def _install_pkgs():
    print(cyan('Install python and associated packages...'))
    sudo('apt-get install -y python3.5')
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

    # for cached
    sudo('apt-get install -y memcached')

    print(cyan('Install http server ...'))
    sudo('apt-get install -y nginx')


@task
def _setup_proj():
    with cd(env.config['project_path']):
        if not exists('venv'):
            sudo('virtualenv venv -p python3')
        sudo('venv/bin/pip install -r requirements.txt')
        sudo('chown -R www-data:www-data venv')

    with cd(env.config['source_path']):
        print(cyan('Prepare project ...'))
        if not env.config['debug']:
            print(cyan('Changing setting for production ...'))
            sed('mysite_backend/settings.py', 'DEBUG = True', 'DEBUG = False', shell=True, use_sudo=True)

        version = local('git rev-parse {}'.format(env.config['branch']), capture=True)
        sed('mysite_backend/settings.py', 'VERSION = ""', 'VERSION = "{} ({})"'.format(env.config['branch'], version), shell=True, use_sudo=True)
        sed('mysite_backend/settings.py', 'USE_CACHE = False', 'USE_CACHE = True', shell=True, use_sudo=True)
        sed('mysite_backend/settings.py', 'HOST = "http://localhost:8000"', 'HOST = "https://{}"'.format(env.config['server_name']), shell=True, use_sudo=True)
        sed('mysite_backend/settings.py', 'SECRET_KEY = "I dont care in development env"', 'SECRET_KEY = "{}"'.format(env.secret_key), shell=True, use_sudo=True)

        sudo('../venv/bin/python manage.py migrate')
        sudo('../venv/bin/python manage.py collectstatic --noinput')
        sudo('../venv/bin/python manage.py createcachetable')


@task
def _test_proj():
    with cd(env.config['source_path']):
        run("../venv/bin/python manage.py test")


@task
def _setup_serv():
    sudo('locale-gen zh_TW.UTF-8')

    filename = env.config['name'] + '.conf'

    print(cyan('Setup gunicorn ...'))
    config_path = '/etc/init/' + filename
    with cd(env.config['project_path']):
        sudo('cp conf/init/service.conf ' + config_path)
        sed(config_path, 'TARGET_NAME', env.config['name'], shell=True, use_sudo=True)

    print(cyan('Setup nginx ...'))
    if exists('/etc/nginx/sites-enabled/default'):
        sudo('rm /etc/nginx/sites-enabled/default')

    config_path = '/etc/nginx/sites-available/' + filename
    with cd(env.config['project_path']):
        sudo('cp conf/nginx/nginx.conf ' + config_path)
        sed(config_path, 'TARGET_NAME', env.config['name'], shell=True, use_sudo=True)
        sed(config_path, 'SERVER_NAME', str(env.config['server_name']), shell=True, use_sudo=True)

    with cd('/etc/nginx/sites-enabled'):
        if exists(filename):
            sudo('rm ' + filename)
        sudo('ln -s {config_path} {filename}'.format(config_path=config_path, filename=filename))
