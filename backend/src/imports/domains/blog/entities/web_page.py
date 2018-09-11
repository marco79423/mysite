from imports.domains import base_types


class WebPage(base_types.Entity):

    def __init__(self,
                 app: str,
                 slug: str,
                 title: str,
                 content: str,
                 ):
        self.app = app
        self.slug = slug
        self.title = title
        self.content = content

    def serialize(self):
        return {
            'app': self.app,
            'slug': self.slug,
            'title': self.title,
            'content': self.content,
        }
