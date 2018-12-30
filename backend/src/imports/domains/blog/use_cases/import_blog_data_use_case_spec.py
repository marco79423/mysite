import datetime as dt
from unittest.mock import MagicMock, call

from imports.domains.base_types import ResponseError, Request, Response
from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.site_info import SiteInfo
from imports.domains.blog.entities.web_page import WebPage
from imports.domains.blog.use_cases.import_blog_data_use_case import ImportBlogDataUseCase


def test_invalid_input():
    uc = ImportBlogDataUseCase(
        transform_rst_uc=MagicMock(),
        site_info_repo=MagicMock(),
        article_repo=MagicMock(),
        web_page_repo=MagicMock(),
        source_path_serv=MagicMock(),
        env_adapter=MagicMock(),
        path_adapter=MagicMock(),
        slug_adapter=MagicMock(),
        time_adapter=MagicMock(),
        truncate_html_adapter=MagicMock(),
        asset_serv=MagicMock(),
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

    path_adapter = MagicMock()
    path_adapter.exists.return_value = False

    uc = ImportBlogDataUseCase(
        transform_rst_uc=MagicMock(),
        site_info_repo=MagicMock(),
        article_repo=MagicMock(),
        web_page_repo=MagicMock(),
        source_path_serv=MagicMock(),
        env_adapter=MagicMock(),
        path_adapter=path_adapter,
        slug_adapter=MagicMock(),
        time_adapter=MagicMock(),
        truncate_html_adapter=MagicMock(),
        asset_serv=MagicMock(),
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

    path_adapter = MagicMock()
    path_adapter.exists.return_value = True

    source_path_serv = MagicMock()
    source_path_serv.get_all_article_paths.return_value = ['article_path']
    source_path_serv.get_all_web_page_paths.return_value = []

    asset_serv = MagicMock()
    asset_serv.save_and_return_static_url.side_effect = [
        'static_image_url',
        'static_file_url',
    ]

    slug_adapter = MagicMock()
    slug_adapter.to_slug.return_value = 'slug'

    truncate_html_adapter = MagicMock()
    truncate_html_adapter.truncate.side_effect = [
        'summary',
        'raw_summary',
    ]

    uc = ImportBlogDataUseCase(
        transform_rst_uc=transform_rst_uc,
        site_info_repo=MagicMock(),
        article_repo=article_repo,
        web_page_repo=MagicMock(),
        source_path_serv=source_path_serv,
        env_adapter=MagicMock(),
        path_adapter=path_adapter,
        slug_adapter=slug_adapter,
        time_adapter=MagicMock(),
        truncate_html_adapter=truncate_html_adapter,
        asset_serv=asset_serv,
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

    path_adapter = MagicMock()
    path_adapter.exists.return_value = True

    source_path_serv = MagicMock()
    source_path_serv.get_all_article_paths.return_value = []
    source_path_serv.get_all_web_page_paths.return_value = ['web_page_path']

    asset_serv = MagicMock()
    asset_serv.save_and_return_static_url.side_effect = [
        'static_image_url',
        'static_file_url',
    ]

    slug_adapter = MagicMock()
    slug_adapter.to_slug.return_value = 'slug'

    uc = ImportBlogDataUseCase(
        transform_rst_uc=transform_rst_uc,
        site_info_repo=MagicMock(),
        article_repo=MagicMock(),
        web_page_repo=web_page_repo,
        source_path_serv=source_path_serv,
        env_adapter=MagicMock(),
        path_adapter=path_adapter,
        slug_adapter=slug_adapter,
        time_adapter=MagicMock(),
        truncate_html_adapter=MagicMock(),
        asset_serv=asset_serv,
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


def test_import_site_info_data():
    path_adapter = MagicMock()
    path_adapter.exists.return_value = True

    source_path_serv = MagicMock()
    source_path_serv.get_all_article_paths.return_value = []
    source_path_serv.get_all_web_page_paths.return_value = []

    site_info_repo = MagicMock()
    time_adapter = MagicMock()
    time_adapter.get_utc_now.return_value = dt.datetime(2018, 11, 5, 15, 56, 30)

    env_adapter = MagicMock()
    env_adapter.get.return_value = 'develop (81ccde3550325c06a10b6acce75b4df529955472)'

    uc = ImportBlogDataUseCase(
        transform_rst_uc=MagicMock(),
        site_info_repo=site_info_repo,
        article_repo=MagicMock(),
        web_page_repo=MagicMock(),
        source_path_serv=source_path_serv,
        env_adapter=env_adapter,
        slug_adapter=MagicMock(),
        time_adapter=time_adapter,
        path_adapter=path_adapter,
        truncate_html_adapter=MagicMock(),
        asset_serv=MagicMock(),
    )
    res = uc.execute(Request({'source_dir': 'source_dir', 'max_summary_length': 15}))

    time_adapter.get_utc_now.assert_called_once()
    env_adapter.get.assert_called_once_with('REPO_VERSION', '')

    site_info_repo.add.assert_called_once_with(SiteInfo(
        updated_time=dt.datetime(2018, 11, 5, 15, 56, 30),
        repo_version='develop (81ccde3550325c06a10b6acce75b4df529955472)',
    ))

    assert isinstance(res, Response)
    assert res.data is None
