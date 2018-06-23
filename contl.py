import json

import click
from fabric.api import *
from fabric.colors import cyan
from fabric.contrib.files import exists, sed

PROJECT_CONFIG_FILE = "project_config.json"

CONFIGS = {
    'prod': {
        'name': 'mysite',
        'default_branch': 'master',
        'frontend_port': 3000,
        'backend_port': 8000,
        'server_name': 'marco79423.net',
    },
    'dev': {
        'name': 'mysite-dev',
        'default_branch': 'HEAD',
        'frontend_port': 4000,
        'backend_port': 9000,
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
        sudo('rm -rf *')
        put('dist.tar', 'dist.tar', use_sudo=True)
        sudo('tar vxf dist.tar')
        sudo('rm dist.tar')
        sudo('chown -R www-data:www-data .')
    local('rm dist.tar')


@task
def setup_shared_serv(project_path, project_name, server_name, frontend_port, backend_port):
    sudo('locale-gen zh_TW.UTF-8')

    print(cyan('Setup nginx ...'))
    if exists('/etc/nginx/sites-enabled/default'):
        sudo('rm /etc/nginx/sites-enabled/default')

    config_name = '{}.conf'.format(project_name)
    with cd('/etc/nginx/sites-available/'):
        sudo('cp {}proxy/nginx.conf {}'.format(project_path, config_name))
        sed(config_name, 'TARGET_NAME', project_name, shell=True, use_sudo=True)
        sed(config_name, 'SERVER_NAME', server_name, shell=True, use_sudo=True)
        sed(config_name, 'FRONTEND_PORT', str(frontend_port), shell=True, use_sudo=True)
        sed(config_name, 'BACKEND_PORT', str(backend_port), shell=True, use_sudo=True)

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


@main.command()
@click.argument('operation', type=click.Choice(['update']))
def server(operation):
    print('server')
    if operation == 'update':
        execute(update_sys)


@main.command()
@click.option('--prod', is_flag=True)
@click.option('--branch')
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

    with cd(project_path):
        sudo('docker-compose pull')
        sudo('docker-compose up --force-recreate --detach')

    project_name = config['name']
    server_name = config['server_name']
    frontend_port = config['frontend_port']
    backend_port = config['backend_port']
    execute(setup_shared_serv, project_path, project_name, server_name, frontend_port, backend_port)
    execute(restart_shared_service)


if __name__ == '__main__':
    main()
