import datetime as dt
from unittest.mock import MagicMock, call

from imports.domains.base_types import ResponseError, Request, Response
from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.web_page import WebPage
from imports.domains.blog.use_cases.import_blog_data_use_case import ImportBlogDataUseCase


def test_invalid_input():
    uc = ImportBlogDataUseCase(
        transform_rst_uc=MagicMock(),
        article_repo=MagicMock(),
        web_page_repo=MagicMock(),
        path_serv=MagicMock(),
        slug_serv=MagicMock(),
        asset_serv=MagicMock(),
        truncate_html_serv=MagicMock(),
    )

    res = uc.execute()
    assert isinstance(res, ResponseError)
    assert res.reason == 'A request is required'

    res = uc.execute(Request())
    assert isinstance(res, ResponseError)
    assert res.reason == 'Invalid input'

    res = uc.execute(Request({'source_dir': 999, 'max_summary_length': 15}))
    assert isinstance(res, ResponseError)
    assert res.reason == 'Invalid input'

    res = uc.execute(Request({'source_dir': 'str', 'max_summary_length': 'string'}))
    assert isinstance(res, ResponseError)
    assert res.reason == 'Invalid input'

    path_serv = MagicMock()
    path_serv.exists.return_value = False

    uc = ImportBlogDataUseCase(
        transform_rst_uc=MagicMock(),
        article_repo=MagicMock(),
        web_page_repo=MagicMock(),
        path_serv=path_serv,
        slug_serv=MagicMock(),
        asset_serv=MagicMock(),
        truncate_html_serv=MagicMock(),
    )
    res = uc.execute(Request({'source_dir': 'invalid_path', 'max_summary_length': 15}))

    assert isinstance(res, ResponseError)
    assert res.reason == 'source_dir "invalid_path" does not exist'


def test_import_article_data():
    transform_rst_uc = MagicMock()
    transform_rst_uc.execute.return_value = Response({
        'title': 'title',
        'content': 'content image_url file_url',
        'categories': [],
        'date': dt.date(2018, 1, 1),
        'modified_date': dt.date(2018, 1, 2),
        'item_images': [
            {
                'url': 'image_url',
                'basename': 'image_basename',
                'data': 'image_data',
            }
        ],
        'item_files': [
            {
                'url': 'file_url',
                'basename': 'file_basename',
                'data': 'file_data',
            }
        ],
    })

    article_repo = MagicMock()

    path_serv = MagicMock()
    path_serv.exists.return_value = True
    path_serv.get_all_article_paths.return_value = ['article_path']
    path_serv.get_all_web_page_paths.return_value = []

    asset_serv = MagicMock()
    asset_serv.save_and_return_static_url.side_effect = [
        'static_image_url',
        'static_file_url',
    ]

    slug_serv = MagicMock()
    slug_serv.to_slug.return_value = 'slug'

    truncate_html_serv = MagicMock()
    truncate_html_serv.truncate.side_effect = [
        'summary',
        'raw_summary',
    ]

    uc = ImportBlogDataUseCase(
        transform_rst_uc=transform_rst_uc,
        article_repo=article_repo,
        web_page_repo=MagicMock(),
        path_serv=path_serv,
        slug_serv=slug_serv,
        asset_serv=asset_serv,
        truncate_html_serv=truncate_html_serv,
    )
    res = uc.execute(Request({'source_dir': 'source_dir', 'max_summary_length': 15}))
    transform_rst_uc.execute.assert_called_once_with(Request('article_path'))

    asset_serv.save_and_return_static_url.assert_has_calls([
        call(
            filename='image_basename',
            data='image_data',
            is_attachment=False,
        ),
        call(
            filename='file_basename',
            data='file_data',
            is_attachment=True,
        ),
    ])

    article_repo.add.assert_called_once_with(Article(
        slug='slug',
        title='title',
        chicken_count=0,
        content='content static_image_url static_file_url',
        categories=[],
        summary='summary',
        raw_summary='raw_summary',
        date=dt.date(2018, 1, 1),
        modified_date=dt.date(2018, 1, 2),
    ))

    assert isinstance(res, Response)
    assert res.data is None


def test_import_web_page_data():
    transform_rst_uc = MagicMock()
    transform_rst_uc.execute.return_value = Response({
        'title': 'title',
        'content': 'content image_url file_url',
        'categories': [],
        'date': dt.date(2018, 1, 1),
        'modified_date': dt.date(2018, 1, 2),
        'item_images': [
            {
                'url': 'image_url',
                'basename': 'image_basename',
                'data': 'image_data',
            }
        ],
        'item_files': [
            {
                'url': 'file_url',
                'basename': 'file_basename',
                'data': 'file_data',
            }
        ],
    })

    web_page_repo = MagicMock()

    path_serv = MagicMock()
    path_serv.exists.return_value = True
    path_serv.get_all_article_paths.return_value = []
    path_serv.get_all_web_page_paths.return_value = ['web_page_path']

    asset_serv = MagicMock()
    asset_serv.save_and_return_static_url.side_effect = [
        'static_image_url',
        'static_file_url',
    ]

    slug_serv = MagicMock()
    slug_serv.to_slug.return_value = 'slug'

    uc = ImportBlogDataUseCase(
        transform_rst_uc=transform_rst_uc,
        article_repo=MagicMock(),
        web_page_repo=web_page_repo,
        path_serv=path_serv,
        slug_serv=slug_serv,
        asset_serv=asset_serv,
        truncate_html_serv=MagicMock()
    )
    res = uc.execute(Request({'source_dir': 'source_dir', 'max_summary_length': 15}))
    transform_rst_uc.execute.assert_called_once_with(Request('web_page_path'))

    asset_serv.save_and_return_static_url.assert_has_calls([
        call(
            filename='image_basename',
            data='image_data',
            is_attachment=False,
        ),
        call(
            filename='file_basename',
            data='file_data',
            is_attachment=True,
        ),
    ])

    web_page_repo.add.assert_called_once_with(WebPage(
        app='me',
        slug='slug',
        title='title',
        content='content static_image_url static_file_url',
    ))

    assert isinstance(res, Response)
    assert res.data is None
