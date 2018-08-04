import htmlmin

from domain.base_types import Service


class MinifyHtmlService(Service):
    def minify_html(self, html: str) -> str:
        return htmlmin.minify(html)
