import re

from blog import utils


class Entity:
    pass


class Article(Entity):
    def __init__(self, title, date, modified_date, categories, content, series):
        self.title = title
        self.date = date
        self.modified_date = modified_date
        self.categories = categories
        self.content = content
        self.categories = categories
        self.series = series

    @property
    def slug(self):
        return utils.convert_to_slug(self.title)

    @property
    def chicken_count(self):
        return len(re.findall(r'(?:chicken|雞)', self.content))

    @property
    def summary(self):
        return self._get_summary(self.content, 15)

    @property
    def raw_summary(self):
        return self._remove_html_tags(self.summary)

    @staticmethod
    def _get_summary(content, max_length):
        return utils.truncate_html_words(content, max_length)

    @staticmethod
    def _remove_html_tags(content):
        return re.sub(r'<[^>]+>', "", content)


class WebPage(Entity):
    def __init__(self, app, title, content):
        self.app = app
        self.title = title
        self.content = content

    @property
    def slug(self):
        return utils.convert_to_slug(self.title)


class Category(Entity):
    def __init__(self, name):
        self.name = name

    @property
    def slug(self):
        return utils.convert_to_slug(self.name)
