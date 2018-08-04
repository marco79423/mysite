from domain.base_types import Entity


class Resource(Entity):
    def __init__(self, url, basename, data):
        self.url = url
        self.basename = basename
        self.data = data

    def serialize(self):
        return {
            'url': self.url,
            'basename': self.basename,
            'data': self.data,
        }
