import abc

from domain import base_types


class MinifyHtmlService(base_types.Service, abc.ABC):

    @abc.abstractmethod
    def minify_html(self, html: str) -> str:
        pass
