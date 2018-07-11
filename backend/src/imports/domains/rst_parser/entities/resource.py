class Entity:
    pass


class Resource(Entity):
    def __init__(self, url: str, basename: str, data):
        self.url = url
        self.basename = basename
        self.data = data

    def serialize(self):
        return {
            'url': self.url,
            'basename': self.basename,
            'data': self.data,
        }
