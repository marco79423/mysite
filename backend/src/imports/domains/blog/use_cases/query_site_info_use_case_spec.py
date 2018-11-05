import datetime as dt
from unittest.mock import MagicMock

from imports.domains.base_types import Response
from imports.domains.blog.entities.site_info import SiteInfo
from imports.domains.blog.use_cases.query_site_info_use_case import QuerySiteInfoUseCase


def test_query_site_info():
    site_info_repo = MagicMock()
    site_info_repo.select_one.return_value = SiteInfo(
        updated_time=dt.datetime(2018, 11, 5, 15, 56, 30),
        repo_version='develop (81ccde3550325c06a10b6acce75b4df529955472)'
    )

    uc = QuerySiteInfoUseCase(
        site_info_repo=site_info_repo
    )
    res = uc.execute()

    site_info_repo.select_one.assert_called_once()

    assert isinstance(res, Response)
    assert res.data == {
        'updated_time': '2018-11-05T15:56:30',
        'repo_version': 'develop (81ccde3550325c06a10b6acce75b4df529955472)',
    }
