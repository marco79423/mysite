from unittest.mock import MagicMock

from imports.domains.base_types import Response, ResponseError
from imports.domains.blog.use_cases.clear_all_blog_data_use_case import ClearAllBlogDataUseCase


def test_fail_to_clear_blog_data():
    site_info_repo = MagicMock()
    article_repo = MagicMock()
    web_page_repo = MagicMock()
    asset_repo = MagicMock()

    web_page_repo.clear.side_effect = Exception('Some errors')

    uc = ClearAllBlogDataUseCase(
        site_info_repo=site_info_repo,
        article_repo=article_repo,
        web_page_repo=web_page_repo,
        asset_repo=asset_repo,
    )

    res = uc.execute()
    assert isinstance(res, ResponseError)
    assert res.reason == 'Some errors'


def test_clear_all_blog_data():
    site_info_repo = MagicMock()
    article_repo = MagicMock()
    web_page_repo = MagicMock()
    asset_repo = MagicMock()

    uc = ClearAllBlogDataUseCase(
        site_info_repo=site_info_repo,
        article_repo=article_repo,
        web_page_repo=web_page_repo,
        asset_repo=asset_repo,
    )

    res = uc.execute()

    site_info_repo.clear.assert_called_once()
    article_repo.clear.assert_called_once()
    web_page_repo.clear.assert_called_once()
    asset_repo.clear.assert_called_once()

    assert isinstance(res, Response)
    assert res.data is None
