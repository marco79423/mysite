import abc
import datetime as dt

from imports.domains.base_types import Service


class SourcePathService(Service):

    @abc.abstractmethod
    def get_all_article_paths(self, source_dir: str) -> [str]:
        pass

    @abc.abstractmethod
    def get_all_web_page_paths(self, source_dir: str) -> [str]:
        pass


class AssetService(Service):
    @abc.abstractmethod
    def save_and_return_static_url(self, filename: str, data: str, is_attachment: bool) -> str:
        pass


class TimeService(Service):
    @abc.abstractmethod
    def get_utc_now(self) -> dt.datetime:
        pass

