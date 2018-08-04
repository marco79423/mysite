import datetime as dt
import re
import typing
from enum import Enum

from domain import base_types
from domain.blog.models.category import Category


class Type(Enum):
    NORMAL = 'TYPE_NORMAL'
    WEB_PAGE = 'TYPE_WEB_PAGE'


class Article(base_types.Entity):
    def __init__(self,
                 type: Type,
                 slug: str,
                 title: str,
                 content: str,
                 categories: typing.Optional[typing.List[Category]] = None,
                 summary: str = '',
                 date: typing.Optional[dt.date] = None,
                 modified_date: typing.Optional[dt.date] = None,
                 ):
        self.type = type
        self.slug = slug
        self.title = title
        self.content = content
        self.categories = categories
        self.summary = summary
        self.date = date
        self.modified_date = modified_date

    def serialize(self):
        if self.type == Type.NORMAL:
            return {
                'slug': self.slug,
                'title': self.title,
                'date': self.date.isoformat(),
                'modified_date': self.modified_date.isoformat() if self.modified_date else None,
                'categories': [category.serialize() for category in self.categories],
                'chicken_count': self.chicken_count,
                'content': self.content,
                'summary': self.summary,
                'raw_summary': self.raw_summary,
            }
        elif self.type == Type.WEB_PAGE:
            return {
                'app': 'me',
                'slug': self.slug,
                'title': self.title,
                'content': self.content,
            }

    @property
    def chicken_count(self):
        return len(re.findall(r'(?:chicken|雞)', self.content))

    @property
    def raw_summary(self):
        return self._remove_html_tags(self.summary)

    @staticmethod
    def _remove_html_tags(content):
        return

    def __lt__(self, article):
        return self.date < article.date