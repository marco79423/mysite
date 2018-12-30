import abc

from imports.domains.base_types import Service
from imports.domains.rst_parser.entities.article import Article


class PathAdapter(Service):

    @abc.abstractmethod
    def exists(self, file_path: str) -> bool:
        pass


class TransformRstAdapter(Service):

    @abc.abstractmethod
    def generate_article(self, article_path: str) -> Article:
        pass

