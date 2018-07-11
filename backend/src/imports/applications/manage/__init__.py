from imports.applications.manage import config
from imports.applications.manage.domain_injector import domain_injector
from imports.applications.server import create_app
from imports.domains.base_types import Request
from imports.domains.blog.use_cases.clear_all_blog_data_use_case import ClearAllBlogDataUseCase
from imports.domains.blog.use_cases.import_blog_data_use_case import ImportBlogDataUseCase


def clear_all_blog_data():
    app = create_app()
    with app.app_context():
        uc = domain_injector.get(ClearAllBlogDataUseCase)
        res = uc.execute()
        if not res:
            print('ERROR', res.reason)
            return
        print('Done')


def import_blog_data(source_dir):
    app = create_app()
    with app.app_context():
        print('Clear all blog data ...')
        uc = domain_injector.get(ClearAllBlogDataUseCase)
        res = uc.execute()
        if not res:
            print('ERROR', res.reason)
            return

        print('Generate blog data to database ...')
        uc = domain_injector.get(ImportBlogDataUseCase)
        res = uc.execute(Request({
            'source_dir': source_dir,
            'max_summary_length': config.MAX_SUMMARY_LENGTH,
        }))
        if not res:
            print('ERROR:', res.reason)
            return
        print('Done')
