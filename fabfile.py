from __future__ import print_function

from ConfigParser import SafeConfigParser as ConfigParser
from StringIO import StringIO

from fabric.api import *
from fabric.colors import green, cyan, yellow
from fabric.contrib.files import exists, sed


PROJECT_NAME = "mysite"
PROJECT_PATH = "/var/www/" + PROJECT_NAME
OFFICIAL_SITE_PATH = "/var/www/" + PROJECT_NAME + "-official"
HOST_CONFIG_FILE = "hosts.ini"


@task
def set_host(target):
    cfg = ConfigParser()
    if cfg.read(HOST_CONFIG_FILE) and cfg.has_section(target):
        if cfg.get(target, "type") == "normal":
            env.password = cfg.get(target, "password")
        elif cfg.get(target, "type") == "aws":
            env.key_filename = cfg.get(target, "pem_file")

    user = cfg.get(target, "user")
    host = cfg.get(target, "host")
    env.hosts = [user + "@" + host]


@task
def deploy(branch="master"):
    prepare_env()
    put_proj(branch=branch)
    setup_proj()
    build_content()
    replace_official_site()
    setup_apache2()

    print(yellow("  :####:   ##    ##    :####:    :####:  ########   :####:    :####:  "))
    print(yellow(" :######   ##    ##    ######    ######  ########  :######   :######  "))
    print(yellow(" ##:  :#   ##    ##  :##:  .#  :##:  .#  ##        ##:  :#   ##:  :#  "))
    print(yellow(" ##        ##    ##  ##        ##        ##        ##        ##       "))
    print(yellow(" ###:      ##    ##  ##.       ##.       ##        ###:      ###:     "))
    print(yellow(" :#####:   ##    ##  ##        ##        #######   :#####:   :#####:  "))
    print(yellow("  .#####:  ##    ##  ##        ##        #######    .#####:   .#####: "))
    print(yellow("     :###  ##    ##  ##.       ##.       ##            :###      :### "))
    print(yellow("       ##  ##    ##  ##        ##        ##              ##        ## "))
    print(yellow(" #:.  :##  ##    ##  :##:  .#  :##:  .#  ##        #:.  :##  #:.  :## "))
    print(yellow(" #######:  :######:    ######    ######  ########  #######:  #######: "))
    print(yellow(" .#####:    :####:     :####:    :####:  ########  .#####:   .#####:  "))


@task
def prepare_env():
    print(green("##################################"))
    print(green("Prepare environment ..."))
    print(green("##################################"))
    update_sys()
    install_pkg()


@task
def update_sys():
    print(green("##################################"))
    print(green("Updating server ..."))
    print(green("##################################"))
    sudo("apt-get update --fix-missing")
    sudo("apt-get upgrade -y ")


@task
def install_pkg():
    print(green("################################"))
    print(green("Installing required packages ..."))
    print(green("################################"))
    sudo("apt-get install -y python3.4 python3-pip")
    sudo("apt-get install -y apache2 libapache2-mod-wsgi-py3")
    sudo("pip3 install virtualenv")


@task
def put_proj(branch):
    print(green("###################################"))
    print(green("Uploading git archive to server ..."))
    print(green("###################################"))
    if exists(PROJECT_PATH):
        sudo("rm -rf {}".format(PROJECT_PATH))

    sudo("mkdir -p {}".format(PROJECT_PATH))
    archive = local("git archive --format=tar {} | gzip".format(branch), capture=True)
    with cd(PROJECT_PATH):
        put(StringIO(archive), "temp.tar.gz", use_sudo=True)
        sudo("tar zxf temp.tar.gz")
        sudo("rm temp.tar.gz")


@task
def setup_proj():
    print(green("#####################"))
    print(green("Preparing project ..."))
    print(green("#####################"))
    with cd(PROJECT_PATH):
        sudo("virtualenv venv -p python3")
        sudo("venv/bin/pip install -r requirements.txt")

        print(cyan("Prepare project ..."))
        sudo("venv/bin/python manage.py migrate")
        sudo("venv/bin/python manage.py collectstatic --noinput")

        print(cyan("Changing setting for production ..."))
        setting_path = "{}/settings.py".format(PROJECT_NAME)
        sed(setting_path, "DEBUG = True", "DEBUG = False", shell=True, use_sudo=True)
        sed(setting_path, "ALLOWED_HOSTS =.+$", 'ALLOWED_HOSTS = ["*"]', shell=True, use_sudo=True)


@task
def test_proj():
    print(green("#####################"))
    print(green("Testing project ..."))
    print(green("#####################"))
    with cd(PROJECT_PATH):
        run("venv/bin/python manage.py test")


@task
def build_content():
    print(green("#########################"))
    print(green("Fetching blog content ..."))
    print(green("#########################"))
    if not exists("/var/www/site-content"):
        sudo("git clone https://bitbucket.org/marco79423/site-content /var/www/site-content")
    else:
        with cd("/var/www/site-content"):
            sudo("git pull")

    with cd(PROJECT_PATH):
        sudo("venv/bin/python manage.py build /var/www/site-content")


@task
def replace_official_site():
    if exists(OFFICIAL_SITE_PATH):
        sudo("rm -rf {}".format(OFFICIAL_SITE_PATH))
    sudo("mv {} {}".format(PROJECT_PATH, OFFICIAL_SITE_PATH))


@task
def setup_apache2():
    print(green("##################################"))
    print(green("Setting Apache ..."))
    print(green("##################################"))
    sudo("locale-gen zh_TW.UTF-8")
    sudo("a2dissite 000-default")  # we want rid of the default apache config

    # optimization
    sudo("a2enmod expires")

    with cd(OFFICIAL_SITE_PATH):
        sudo("chown -R www-data:www-data .")
        config_path = "{}/apache2.conf".format(OFFICIAL_SITE_PATH)
        sed(config_path, "PROJECT_PATH", OFFICIAL_SITE_PATH, use_sudo=True, shell=True)
        sed(config_path, "PROJECT_NAME", PROJECT_NAME, use_sudo=True, shell=True)

        sudo("cp {} /etc/apache2/sites-available/{}.conf".format(config_path, PROJECT_NAME))
        sudo("a2ensite {}".format(PROJECT_NAME))
        sudo('service apache2 restart')
