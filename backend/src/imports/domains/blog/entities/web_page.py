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

    def __eq__(self, web_page):
        return (self.app == web_page.app and
                self.slug == web_page.slug and
                self.title == web_page.title and
                self.content == web_page.content)
