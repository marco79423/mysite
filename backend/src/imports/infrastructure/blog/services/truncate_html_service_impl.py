import re

import injector
from pelican import utils as pelican_utils

from imports.domains.blog.services import TruncateHTMLService


@injector.singleton
class TruncateHTMLServiceImpl(TruncateHTMLService):
    def truncate(self, html: str, max_length: int, without_tag: bool) -> str:
        summary = pelican_utils.truncate_html_words(html, max_length)
        if without_tag:
            summary = re.sub(r'<[^>]+>', "", summary)
        return summary
