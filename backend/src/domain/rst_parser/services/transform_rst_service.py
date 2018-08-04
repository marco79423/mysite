import io
import uuid
from datetime import datetime

import dateutil.parser
import docutils.core
import docutils.io
import docutils.nodes
from PIL import Image

from domain.base_types import Service
from domain.rst_parser.entities.article import Article
from domain.rst_parser.entities.resource import Resource
from domain.rst_parser.services.directives import youtube, pygments

youtube.register()
pygments.register()


class TransformRstService(Service):

    def __init__(self):
        self._extra_params = {
            'initial_header_level': '2',
            'syntax_highlight': 'short',
            'input_encoding': 'utf-8',
            'exit_status_level': 2,
            'embed_stylesheet': False
        }

    def generate_article(self, file_path):
        with open(file_path, encoding='utf-8') as fp:
            raw_data = fp.read()

        publisher = self._get_publisher(raw_data)
        return Article(
            title=self._get_title(publisher),
            tags=self._get_tags(publisher),
            content=self._get_content(publisher),
            images=self._get_images(file_path.parent),
            files=self._get_files(file_path.parent)
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

    @staticmethod
    def _get_images(item_dir):
        image_data = []
        image_dir = item_dir / "images"
        if image_dir.exists():
            for file in image_dir.files():
                if file.ext == ".gif":
                    data = file.bytes()
                else:
                    image = Image.open(file)
                    buffer = io.BytesIO()
                    image.save(
                        buffer,
                        format='JPEG' if file.ext.upper() == '.JPG' else file.ext[1:].upper(),
                        quality=75,
                        optimize=True
                    )
                    data = buffer.getvalue()

                image_data.append(Resource(
                    url="images/" + file.name,
                    basename=file.name,
                    data=data
                ))

        return image_data

    @staticmethod
    def _get_files(item_dir):
        file_data = []
        file_dir = item_dir / "files"
        if file_dir.exists():
            for file in file_dir.files():
                file_data.append(Resource(
                    url="files/" + file.name,
                    basename=file.name,
                    data=file.bytes()
                ))
        return file_data

    @staticmethod
    def _get_article_path(item_dir):
        for file_path in item_dir.files():
            if item_dir.abspath().name in file_path:
                return file_path
        raise FileNotFoundError
