import abc

from imports.domains.base_types import Repository
from imports.domains.blog.entities.article import Article


class ArticleRepository(Repository):

    @abc.abstractmethod
    def select_all(self) -> [Article]:
        pass
