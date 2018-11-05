import datetime as dt

from imports.domains.blog.entities.site_info import SiteInfo


def test_serialize_site_info():
    site_info = SiteInfo(
        updated_time=dt.datetime(2018, 11, 5, 15, 56, 30),
        repo_version='develop (81ccde3550325c06a10b6acce75b4df529955472)',
    )
    assert site_info.serialize() == {
        'updated_time': '2018-11-05T15:56:30',
        'repo_version': 'develop (81ccde3550325c06a10b6acce75b4df529955472)',
    }
