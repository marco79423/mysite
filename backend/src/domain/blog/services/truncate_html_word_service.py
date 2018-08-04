from pelican import utils as pelican_utils

from domain.base_types import Service


class TruncateHtmlWordsService(Service):

    def truncate(self, html, max_length) -> str:
        return pelican_utils.truncate_html_words(html, max_length)
