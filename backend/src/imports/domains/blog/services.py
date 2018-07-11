import abc

from imports.domains.base_types import Service


class PathService(Service):

    @abc.abstractmethod
    def exists(self, file_path: str) -> bool:
        pass

    @abc.abstractmethod
    def get_all_article_paths(self, source_dir: str) -> [str]:
        pass

    @abc.abstractmethod
    def get_all_web_page_paths(self, source_dir: str) -> [str]:
        pass


class SlugService(Service):
    @abc.abstractmethod
    def to_slug(self, path: str) -> str:
        pass


class AssetService(Service):
    @abc.abstractmethod
    def save_and_return_static_url(self, filename: str, data: str, is_attachment: bool) -> str:
        pass


class TruncateHTMLService(Service):
    @abc.abstractmethod
    def truncate(self, html: str, max_length: int, without_tag: bool) -> str:
        pass
