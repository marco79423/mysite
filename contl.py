import json
import click
import datetime as dt

from fabric.api import *
from fabric.colors import cyan
from fabric.contrib.files import exists, sed


PROJECT_CONFIG_FILE = "project_config.json"

CONFIGS = {
    'prod': {
        'name': 'mysite',
        'default_branch': 'master',
        'frontend_port': 3000,
        'server_name': 'marco79423.net',
    },
    'dev': {
        'name': 'mysite-dev',
        'default_branch': 'HEAD',
        'frontend_port': 4000,
        'server_name': 'dev.marco79423.net',
    }
}


@task
def update_sys():
    sudo('apt-get update --fix-missing')
    sudo('apt-get upgrade -y ')


@task
def upload_proj(project_path, branch):
    sudo('mkdir -p {}'.format(project_path))
    local('git archive --format=tar {} > dist.tar'.format(branch))
    with cd(project_path):
        put('dist.tar', 'dist.tar', use_sudo=True)
        sudo('tar vxf dist.tar')
        sudo('rm dist.tar')
        sudo('chown -R www-data:www-data .')
    local('rm dist.tar')


@task
def install_frontend_required_pkgs():
    if not exists('/usr/bin/node'):
        print(cyan('Install node and associated packages...'))
        sudo('curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -')

    if not exists('/usr/bin/yarn'):
        sudo('curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -')
        sudo('echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list')
        sudo('sudo apt-get update && sudo apt-get install yarn')

    print(cyan('Install http server ...'))
    sudo('apt-get install -y nginx')


@task
def install_backend_required_pkgs():
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
def setup_frontend_proj(frontend_path, project_version, server_name):
    updated_time = str(dt.datetime.now())

    with cd(frontend_path):
        print(cyan('Prepare project ...'))
        settings_path = '{}src/config/shared.js'.format(frontend_path)
        sed(settings_path, 'BACKEND_SERVER_URL = ""', 'BACKEND_SERVER_URL = "https://{}"'.format(server_name), shell=True, use_sudo=True)
        sed(settings_path, 'SITE_VERSION = ""', 'SITE_VERSION = "{}"'.format(project_version), shell=True, use_sudo=True)
        sed(settings_path, 'SITE_UPDATED_TIME = ""', 'SITE_UPDATED_TIME = "{}"'.format(updated_time), shell=True, use_sudo=True)

        sudo('yarn', warn_only=True)
        sudo("yarn test")

        sudo('yarn dist')
        sudo('chown -R www-data:www-data .')


@task
def setup_frontend_serv(frontend_path, project_name, frontend_port):
    print(cyan('Setup express ...'))
    config_path = '/etc/init/{}-express.conf'.format(project_name)
    with cd(frontend_path):
        sudo('cp conf/init/service.conf {}'.format(config_path))
        sed(config_path, 'TARGET_NAME', project_name, shell=True, use_sudo=True)
        sed(config_path, 'PORT', str(frontend_port), shell=True, use_sudo=True)


@task
def restart_frontend_service(project_name):
    sudo('service {}-express restart'.format(project_name))


@task
def setup_backend_proj(backend_path, server_name, project_version, backend_secret_key):
    with cd(backend_path):
        if not exists('venv'):
            sudo('virtualenv venv -p python3')

        sudo('venv/bin/pip install -r requirements.txt')
        sudo('chown -R www-data:www-data venv')

        with cd('src'):
            print(cyan('Prepare project ...'))

            sed('mysite_backend/settings.py', 'VERSION = ""', 'VERSION = "{}"'.format(project_version), shell=True, use_sudo=True)
            sed('mysite_backend/settings.py', 'USE_CACHE = False', 'USE_CACHE = True', shell=True, use_sudo=True)
            sed('mysite_backend/settings.py', 'HOST = "http://localhost:8000"', 'HOST = "https://{}"'.format(server_name), shell=True, use_sudo=True)
            sed('mysite_backend/settings.py', 'SECRET_KEY = "I dont care in development env"', 'SECRET_KEY = "{}"'.format(backend_secret_key), shell=True, use_sudo=True)

            sudo('../venv/bin/python manage.py migrate')
            sudo('../venv/bin/python manage.py collectstatic --noinput')
            sudo('../venv/bin/python manage.py createcachetable')

            sudo("../venv/bin/python manage.py test")

            sudo("../venv/bin/python manage.py build")


@task
def setup_backend_serv(backend_path, project_name):
    for service_name in ['gunicorn', 'celeryd']:
        print(cyan('Setup {} ...'.format(service_name)))
        config_path = '/etc/init/{}-{}.conf'.format(project_name, service_name)
        with cd(backend_path):
            sudo('cp conf/init/service-{}.conf {}'.format(service_name, config_path))
            sed(config_path, 'TARGET_NAME', project_name, shell=True, use_sudo=True)


@task
def restart_backend_service(project_name):
    for service_name in ['gunicorn', 'celeryd']:
        sudo('service {}-{} restart'.format(project_name, service_name))


@task
def setup_shared_serv(project_path, project_name, server_name, frontend_port):
    sudo('locale-gen zh_TW.UTF-8')

    print(cyan('Setup nginx ...'))
    if exists('/etc/nginx/sites-enabled/default'):
        sudo('rm /etc/nginx/sites-enabled/default')

    config_name = '{}.conf'.format(project_name)
    with cd('/etc/nginx/sites-available/'):
        sudo('cp {}proxy/nginx.conf {}'.format(project_path, config_name))
        sed(config_name, 'TARGET_NAME', project_name, shell=True, use_sudo=True)
        sed(config_name, 'SERVER_NAME', server_name, shell=True, use_sudo=True)
        sed(config_name, 'PORT', str(frontend_port), shell=True, use_sudo=True)

    with cd('/etc/nginx/sites-enabled/'):
        if exists(config_name):
            sudo('rm {}'.format(config_name))
        sudo('ln -s ../sites-available/{} .'.format(config_name))


@task
def restart_shared_service():
    sudo('service nginx restart')


@click.group()
def main():
    print('set host ...')
    with open(PROJECT_CONFIG_FILE) as fp:
        config = json.load(fp)
        env.hosts = config.get('hosts', [])
        env.key_filename = config.get('pem_file')
        env.backend_secret_key = config.get('secret_key')


@main.command()
@click.argument('operation', type=click.Choice(['update']))
def server(operation):
    print('server')
    if operation == 'update':
        execute(update_sys)


@main.command()
@click.option('--prod', is_flag=True)
@click.option('--branch')
@click.argument('target', type=click.Choice(['frontend', 'backend', 'all']), default='all')
def deploy(target, branch, prod):
    if prod:
        config = CONFIGS['prod']
    else:
        config = CONFIGS['dev']

    if not branch:
        branch = config['default_branch']

    print('deploy target: {} mode: {} branch: {}'.format(target, 'prod' if prod else 'dev', branch))

    project_path = '/var/www/{}/'.format(config['name'])
    execute(upload_proj, project_path, branch)

    commit_hash = local('git rev-parse {}'.format(branch), capture=True)
    project_version = "{} ({})".format(branch, commit_hash)

    project_name = config['name']
    server_name = config['server_name']
    frontend_port = config['frontend_port']
    backend_secret_key = env.backend_secret_key

    if target in ('frontend', 'all'):
        execute(install_frontend_required_pkgs)
        frontend_path = '{}frontend/'.format(project_path)
        execute(setup_frontend_proj, frontend_path, project_version, server_name)
        execute(setup_frontend_serv, frontend_path, project_name, frontend_port)
        execute(restart_frontend_service, project_name)

    if target in ('backend', 'all'):
        execute(install_backend_required_pkgs)

        backend_path = '{}backend/'.format(project_path)
        execute(setup_backend_proj, backend_path, server_name, project_version, backend_secret_key)
        execute(setup_backend_serv, backend_path, project_name)
        execute(restart_backend_service, project_name)

    execute(setup_shared_serv, project_path, project_name, server_name, frontend_port)
    execute(restart_shared_service)


if __name__ == '__main__':
    main()
