from domain.base_types import Entity


class Article(Entity):
    def __init__(self, title, tags, content, images, files):
        self.title = title
        self.tags = tags
        self.content = content
        self.images = images
        self.files = files

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
            'images': [image.serialize() for image in self.images],
            'files': [file.serialize() for file in self.files],
        }
