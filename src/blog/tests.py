import datetime as dt

from rest_framework.test import APITestCase

from blog import entities
from blog import store


class ArticleAPITest(APITestCase):
    def setUp(self):
        store.ArticleStore.create(entities.Article(
            title='Title 1',
            date=dt.datetime(2017, 5, 6),
            modified_date=dt.datetime(2017, 5, 7),
            content='content 1',
            categories=[entities.Category(category) for category in ['C1', 'C2']],
            series='series'
        ))
        store.ArticleStore.create(entities.Article(
            title='Title 2',
            date=dt.datetime(2017, 5, 7),
            modified_date=None,
            content='content 2  chicken 雞',
            categories=[entities.Category(category) for category in ['C1']],
            series='series'
        ))
        store.ArticleStore.create(entities.Article(
            title='Title 3',
            date=dt.datetime(2017, 5, 8),
            modified_date=dt.datetime(2017, 5, 9),
            content='content 3 雞',
            categories=[entities.Category(category) for category in ['C2']],
            series=None
        ))

    def test_articles(self):
        response = self.client.get(path='/api/articles/')
        self.assertEqual(
            response.data,
            [
                {
                    "slug": "title-3",
                    "title": "Title 3",
                    "date": "2017-05-08T00:00:00",
                    "modified_date": "2017-05-09T00:00:00",
                    "categories": [
                        {"slug": "c2", "name": "C2"}
                    ],
                    "chicken_count": 1,
                    "content": "content 3 雞",
                    "summary": "content 3 雞",
                    "raw_summary": "content 3 雞",
                    "series": None
                },
                {
                    "slug": "title-2",
                    "title": "Title 2",
                    "date": "2017-05-07T00:00:00",
                    "modified_date": None,
                    "categories": [
                        {"slug": "c1", "name": "C1"}
                    ],
                    "chicken_count": 2,
                    "content": "content 2  chicken 雞",
                    "summary": "content 2  chicken 雞",
                    "raw_summary": "content 2  chicken 雞",
                    "series": "series"
                },
                {
                    "slug": "title-1",
                    "title": "Title 1",
                    "date": "2017-05-06T00:00:00",
                    "modified_date": "2017-05-07T00:00:00",
                    "categories": [
                        {"slug": "c1", "name": "C1"},
                        {"slug": "c2", "name": "C2"},
                    ],
                    "chicken_count": 0,
                    "content": "content 1",
                    "summary": "content 1",
                    "raw_summary": "content 1",
                    "series": "series"
                }
            ]
        )


class WebPageAPITest(APITestCase):
    def setUp(self):
        store.WebPageStore.create(entities.WebPage(
            app="me",
            title='Title 1',
            content='content 1'
        ))
        store.WebPageStore.create(entities.WebPage(
            app="me",
            title='Title 2',
            content='content 2'
        ))

    def test_articles(self):
        response = self.client.get(path='/api/web_pages/')
        self.assertEqual(
            response.data,
            [
                {
                    "app": "me",
                    "slug": "title-1",
                    "title": "Title 1",
                    "content": "content 1",
                },
                {
                    "app": "me",
                    "slug": "title-2",
                    "title": "Title 2",
                    "content": "content 2",
                }
            ]
        )
