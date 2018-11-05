import abc
import typing

from imports.domains.base_types import Repository
from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.asset import Asset
from imports.domains.blog.entities.site_info import SiteInfo
from imports.domains.blog.entities.web_page import WebPage


class AssetRepository(Repository):

    @abc.abstractmethod
    def select_by_uuid(self, uuid: str) -> typing.Union[Asset, None]:
        pass

    @abc.abstractmethod
    def add(self, asset: Asset) -> None:
        pass

    @abc.abstractmethod
    def clear(self) -> None:
        pass


class ArticleRepository(Repository):

    @abc.abstractmethod
    def select_all(self, order_by_date=True) -> [Article]:
        pass

    @abc.abstractmethod
    def add(self, article: Article) -> None:
        pass

    @abc.abstractmethod
    def clear(self) -> None:
        pass


class WebPageRepository(Repository):

    @abc.abstractmethod
    def select_all(self) -> [WebPage]:
        pass

    @abc.abstractmethod
    def add(self, web_page: WebPage) -> None:
        pass

    @abc.abstractmethod
    def clear(self) -> None:
        pass


class SiteInfoRepository(Repository):

    @abc.abstractmethod
    def add(self, site_info: SiteInfo):
        pass

    @abc.abstractmethod
    def select_one(self) -> SiteInfo:
        pass

    @abc.abstractmethod
    def clear(self) -> None:
        pass
