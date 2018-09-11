import abc

from imports.domains.base_types import Repository
from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.web_page import WebPage


class ArticleRepository(Repository):

    @abc.abstractmethod
    def select_all(self) -> [Article]:
        pass


class WebPageRepository(Repository):

    @abc.abstractmethod
    def select_all(self) -> [WebPage]:
        pass
