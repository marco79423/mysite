import click

from imports.applications import manage


@click.group()
def main():
    pass


@main.command(help='clear all blog data')
def clear_all_blog_data():
    manage.clear_all_blog_data()


@main.command(help='import blog data to database')
@click.argument('source_dir', default='../../content', type=click.Path(exists=True, file_okay=False, dir_okay=True))
def import_blog_data(source_dir):
    manage.import_blog_data(source_dir)


if __name__ == '__main__':
    main()
