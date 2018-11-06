import datetime as dt

from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.category import Category


def test_serialize_article():
    article = Article(
        slug='slug',
        title='title',
        date=dt.date(2018, 9, 9),
        categories=[
            Category(
                slug='slug 1',
                name='name 1',
            ),
            Category(
                slug='slug 2',
                name='name 2',
            )
        ],
        chicken_count=3,
        content='content',
        summary='summary',
        raw_summary='raw_summary',
    )
    assert article.serialize() == {
        'slug': 'slug',
        'title': 'title',
        'date': '2018-09-09',
        'modifiedDate': None,
        'categories': [
            category.serialize() for category in article.categories
        ],
        'chickenCount': 3,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary',
    }


def test_serialize_modified_article():
    article = Article(
        slug='slug',
        title='title',
        date=dt.date(2018, 9, 9),
        categories=[
            Category(
                slug='slug 1',
                name='name 1',
            ),
            Category(
                slug='slug 2',
                name='name 2',
            )
        ],
        chicken_count=3,
        content='content',
        summary='summary',
        raw_summary='raw_summary',
        modified_date=dt.date(2018, 9, 10),
    )
    assert article.serialize() == {
        'slug': 'slug',
        'title': 'title',
        'date': '2018-09-09',
        'modifiedDate': '2018-09-10',
        'categories': [
            category.serialize() for category in article.categories
        ],
        'chickenCount': 3,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary',
    }
