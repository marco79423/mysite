import injector
import re

from imports import utils
from imports.domains.blog.adapters import TruncateHTMLAdapter


@injector.singleton
class TruncateHTMLAdapterImpl(TruncateHTMLAdapter):
    def truncate(self, html: str, max_length: int, without_tag: bool) -> str:
        summary = utils.truncate_html_words(html, max_length)
        if without_tag:
            summary = re.sub(r'<[^>]+>', "", summary)
        return summary
