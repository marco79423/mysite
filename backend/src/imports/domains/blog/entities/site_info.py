import datetime as dt

from imports.domains import base_types


class SiteInfo(base_types.Entity):

    def __init__(self, updated_time: dt.datetime, repo_version: str):
        self.updated_time = updated_time
        self.repo_version = repo_version

    def serialize(self):
        return {
            'siteUpdatedTime': self.updated_time.isoformat(),
            'repositoryVersion': self.repo_version,
        }

    def __eq__(self, site_info):
        return self.updated_time == site_info.updated_time and self.repo_version == site_info.repo_version
