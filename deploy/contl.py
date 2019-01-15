import json

import click
from fabric.api import *

PROJECT_CONFIG_FILE = "project_config.json"
PROJECT_PATH = '/var/www/mysite/'

@task
def update_sys():
    sudo('apt-get update --fix-missing')
    sudo('apt-get upgrade -y ')


@task
def deploy_site():
    sudo('mkdir -p {}'.format(PROJECT_PATH))
    local('git archive --format=tar HEAD > dist.tar')
    with cd(PROJECT_PATH):
        sudo('rm -rf *')
        put('dist.tar', 'dist.tar', use_sudo=True)
        sudo('tar vxf dist.tar')
        sudo('rm dist.tar')

        sudo('docker-compose pull')
        sudo('docker-compose up --force-recreate --detach')

        sudo('chown -R www-data:www-data .')
    local('rm dist.tar')


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
def deploy():
    execute(deploy_site)


if __name__ == '__main__':
    main()
