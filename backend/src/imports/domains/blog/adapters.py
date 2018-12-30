import abc
import datetime as dt
from pathlib import Path

from imports.domains.base_types import Adapter


class ConfigAdapter(Adapter):

    @abc.abstractmethod
    def get_base_static_url(self) -> str:
        pass


class EnvAdapter(Adapter):

    @abc.abstractmethod
    def get(self, name: str, default=None):
        pass


class IdentityAdapter(Adapter):

    @abc.abstractmethod
    def generate(self) -> str:
        pass


class PathAdapter(Adapter):

    @abc.abstractmethod
    def exists(self, file_path: str) -> bool:
        pass

    @abc.abstractmethod
    def get_base_name(self, file_path: str) -> str:
        pass

    @abc.abstractmethod
    def join(self, *file_paths: [str]) -> str:
        pass

    @abc.abstractmethod
    def get_all_sub_folders(self, file_path: str) -> [str]:
        pass


class SlugAdapter(Adapter):

    @abc.abstractmethod
    def to_slug(self, path: str) -> str:
        pass


class TimeAdapter(Adapter):

    @abc.abstractmethod
    def get_utc_now(self) -> dt.datetime:
        pass


class TruncateHTMLAdapter(Adapter):

    @abc.abstractmethod
    def truncate(self, html: str, max_length: int, without_tag: bool) -> str:
        pass
