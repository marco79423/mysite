from __future__ import print_function
import json
from StringIO import StringIO

from fabric.api import *
from fabric.colors import cyan
from fabric.contrib.files import exists, sed


HOST_CONFIG_FILE = "hosts.json"

CONFIGS = {
    'prod': {
        'name': 'mysite-frontend',
        'port': 3000,
        'server_name': 'www.marco79423.net',
        'api_server_url': 'http://api.marco79423.net/api'
    },
    'dev': {
        'name': 'mysite-frontend-dev',
        'port': 4000,
        'server_name': 'dev.marco79423.net',
        'api_server_url': 'http://api-dev.marco79423.net:8000/api'
    }
}

with open(HOST_CONFIG_FILE) as fp:
    hosts_data = json.load(fp)
    env.hosts = hosts_data.get('hosts', [])
    env.key_filename = hosts_data.get('pem_file')


@task
def deploy(type_key='dev', branch='develop'):
    execute(update_sys)
    execute(_set_config, type_key)
    execute(_upload_proj, branch)
    execute(_install_pkgs)
    execute(_setup_proj)
    execute(_test_proj)
    execute(_setup_serv)
    execute(restart_serv)


@task
def update_sys():
    sudo('apt-get update --fix-missing')
    sudo('apt-get upgrade -y ')


@task
def restart_serv():
    sudo('service {name} restart'.format(name=env.config['name']))
    sudo('service nginx restart')


#################
# private tasks #
#################

@task
def _set_config(type_key):
    env.config = CONFIGS[type_key]
    env.config['project_path'] = '/var/www/' + env.config['name']


@task
def _upload_proj(branch):
    if exists(env.config['project_path']):
        sudo('rm -rf {}'.format(env.config['project_path']))
    sudo('mkdir -p {}'.format(env.config['project_path']))
    archive = local('git archive --format=tar {} | gzip'.format(branch), capture=True)
    with cd(env.config['project_path']):
        put(StringIO(archive), 'temp.tar.gz', use_sudo=True)
        sudo('tar zxf temp.tar.gz')
        sudo('rm temp.tar.gz')
        sudo('chown -R www-data:www-data .')


@task
def _install_pkgs():
    print(cyan('Install python and associated packages...'))
    sudo('curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -')

    print(cyan('Install http server ...'))
    sudo('apt-get install -y nginx')


@task
def _setup_proj():
    with cd(env.config['project_path']):
        print(cyan('Prepare project ...'))
        settings_path = '{}/src/common/ducks/config/settings.js'.format(env.config['project_path'])
        sed(settings_path, "API_SERVER_URL = 'http://localhost:8000/api'", env.config['api_server_url'], shell=True, use_sudo=True)

        sudo('npm install', warn_only=True)
        sudo('npm run dist')
        sudo('chown -R www-data:www-data .')


@task
def _test_proj():
    with cd(env.config['project_path']):
        run("echo do nothing ...")


@task
def _setup_serv():
    sudo('locale-gen zh_TW.UTF-8')

    filename = env.config['name'] + '.conf'

    print(cyan('Setup express ...'))
    config_path = '/etc/init/' + filename
    with cd(env.config['project_path']):
        sudo('cp conf/init/service.conf ' + config_path)
        sed(config_path, 'TARGET_NAME', env.config['name'], shell=True, use_sudo=True)
        sed(config_path, 'PORT', str(env.config['port']), shell=True, use_sudo=True)

    print(cyan('Setup nginx ...'))
    if exists('/etc/nginx/sites-enabled/default'):
        sudo('rm /etc/nginx/sites-enabled/default')

    config_path = '/etc/nginx/sites-available/' + filename
    with cd(env.config['project_path']):
        sudo('cp conf/nginx/nginx.conf ' + config_path)
        sed(config_path, 'TARGET_NAME', env.config['name'], shell=True, use_sudo=True)
        sed(config_path, 'SERVER_NAME', env.config['server_name'], shell=True, use_sudo=True)
        sed(config_path, 'PORT', str(env.config['port']), shell=True, use_sudo=True)

    with cd('/etc/nginx/sites-enabled'):
        if exists(filename):
            sudo('rm ' + filename)
        sudo('ln -s {config_path} {filename}'.format(config_path=config_path, filename=filename))
