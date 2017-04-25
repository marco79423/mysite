from datetime import datetime

import dateutil.parser
import docutils.core
import docutils.io
import docutils.nodes

from libs.rst_transformer import entities
from libs.rst_transformer.directives import pygments
from libs.rst_transformer.directives import youtube

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

        publisher = self._get_publisher(raw_data)
        return entities.Item(
            title=self._get_title(publisher),
            tags=self._get_tags(publisher),
            content=self._get_content(publisher),
            item_images=self._get_item_images(file_path.parent),
            item_files=self._get_item_files(file_path.parent)
        )

    def _get_publisher(self, raw_data):
        publisher = docutils.core.Publisher(
            source_class=docutils.io.StringInput,
            destination_class=docutils.io.StringOutput)

        publisher.set_components('standalone', 'restructuredtext', 'html')
        # publisher.writer.translator_class = PelicanHTMLTranslator
        publisher.process_programmatic_settings(None, self._extra_params, None)
        publisher.set_source(source=raw_data)
        publisher.publish(enable_exit_status=True)
        return publisher

    @staticmethod
    def _get_title(publisher):
        return publisher.writer.title[0]

    @staticmethod
    def _get_content(publisher):
        parts = publisher.writer.parts
        return parts.get('body')

    def _get_tags(self, publisher):
        tags = {}
        date_text = self._get_builtin_tag(publisher, "date")
        tags["date"] = dateutil.parser.parse(date_text) if date_text else datetime.now()

        modified_date_text = self._get_custom_tag(publisher, "modified_date")
        tags["modified_date"] = dateutil.parser.parse(modified_date_text) if modified_date_text else None

        categories_text = self._get_custom_tag(publisher, "categories")
        tags["categories"] = categories_text.split(";") if categories_text else []

        tags["series"] = self._get_custom_tag(publisher, "series")

        return tags

    @staticmethod
    def _get_builtin_tag(pub, tag_name):
        for info in pub.document.traverse(docutils.nodes.docinfo):
            for element in info.children:
                if element.tagname.lower() == tag_name:
                    return element.astext()
        return None

    @staticmethod
    def _get_custom_tag(pub, tag_name):
        for info in pub.document.traverse(docutils.nodes.docinfo):
            for element in info.children:
                if element.tagname.lower() == 'field':  # custom fields
                    name_elem, body_elem = element.children
                    field_name = name_elem.astext().lower()
                    if field_name == tag_name:
                        return body_elem.astext()
        return None

    def _get_item_images(self, item_dir):
        return self._get_item_external_resources(item_dir, "images")

    def _get_item_files(self, item_dir):
        return self._get_item_external_resources(item_dir, "files")

    @staticmethod
    def _get_item_external_resources(item_dir, resource):
        external_resources = []
        resource_dir = item_dir / resource
        if resource_dir.exists():
            for file in resource_dir.files():
                external_resources.append({
                    'link': resource + "/" + file.name,
                    'path': file.abspath(),
                })
        return external_resources

    @staticmethod
    def _get_article_path(item_dir):
        for file_path in item_dir.files():
            if item_dir.abspath().name in file_path:
                return file_path
        raise FileNotFoundError


def transform_rst_to_html(file_path):
    return RstTransformer().transform_rst_to_html(file_path)