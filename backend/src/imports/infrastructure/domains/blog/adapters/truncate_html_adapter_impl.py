import injector
import re
from pelican import utils as pelican_utils

from imports.domains.blog.adapters import TruncateHTMLAdapter


@injector.singleton
class TruncateHTMLAdapterImpl(TruncateHTMLAdapter):
    def truncate(self, html: str, max_length: int, without_tag: bool) -> str:
        summary = pelican_utils.truncate_html_words(html, max_length)
        if without_tag:
            summary = re.sub(r'<[^>]+>', "", summary)
        return summary
