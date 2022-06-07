from imports.domains.base_types import Entity
from imports.domains.rst_parser.entities.resource import Resource


class Article(Entity):
    def __init__(self, title: str, tags: [str], content: str, item_images: [Resource], item_files: [Resource]):
        self.title = title
        self.tags = tags
        self.content = content
        self.item_images = item_images
        self.item_files = item_files

    @property
    def categories(self):
        return self.tags['categories']

    @property
    def date(self):
        return self.tags['date']

    @property
    def modified_date(self):
        return self.tags['modified_date']

    def serialize(self):
        return {
            'title': self.title,
            'content': self.content,
            'categories': self.categories,
            'date': self.date,
            'modified_date': self.modified_date,
            'tags': self.tags,
            'item_images': [image.serialize() for image in self.item_images],
            'item_files': [file.serialize() for file in self.item_files],
        }
