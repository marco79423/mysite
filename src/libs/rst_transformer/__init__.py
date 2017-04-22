from datetime import datetime

import dateutil.parser
import docutils.core
import docutils.io
import docutils.nodes
from django.templatetags.static import static

from libs.rst_transformer.directives import youtube, pygments

youtube.register()
pygments.register()


class RstTransformer:

    def __init__(self):
        self._extra_params = {
            'initial_header_level': '2',
            'syntax_highlight': 'short',
            'input_encoding': 'utf-8',
            'exit_status_level': 2,
            'embed_stylesheet': False
        }

    def transform_rst_to_html(self, file_path):
        with open(file_path, encoding='utf-8') as fp:
            raw_data = fp.read()

        pub = docutils.core.Publisher(
            source_class=docutils.io.StringInput,
            destination_class=docutils.io.StringOutput)

        pub.set_components('standalone', 'restructuredtext', 'html')
        # pub.writer.translator_class = PelicanHTMLTranslator
        pub.process_programmatic_settings(None, self._extra_params, None)
        pub.set_source(source=raw_data)
        pub.publish(enable_exit_status=True)
        parts = pub.writer.parts
        content = parts.get('body')

        metadata = dict()
        for info in pub.document.traverse(docutils.nodes.docinfo):
            for element in info.children:
                if element.tagname.lower() == 'field':  # custom fields
                    name_elem, body_elem = element.children
                    field_name = name_elem.astext().lower()
                    if field_name == 'modified_date':
                        metadata[field_name] = dateutil.parser.parse(body_elem.astext())
                    elif field_name == 'cover':
                        metadata[field_name] = static(body_elem.astext())
                elif element.tagname.lower() == 'date':
                    metadata[element.tagname.lower()] = dateutil.parser.parse(element.astext())

        metadata['title'] = pub.writer.title[0]

        if 'date' not in metadata:
            metadata['date'] = datetime.now()
        if 'modified_date' not in metadata:
            metadata['modified_date'] = None
        if 'summary' not in metadata:
            metadata['summary'] = self._get_summary(content, max_length=15)
        if 'cover' not in metadata:
            metadata['cover'] = None

        return content, metadata

    @staticmethod
    def _get_summary(content, max_length):
        from pelican.utils import truncate_html_words
        return truncate_html_words(content, max_length)
