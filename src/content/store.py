from content import entities
from content import models


class Store:
    pass


class ArticleStore(Store):
    @classmethod
    def get_all(cls):
        return [
            entities.Article(
                title=article.title,
                date=article.date,
                modified_date=article.modified_date,
                content=article.content,
                categories=[entities.Category(category.name) for category in article.categories.all()],
                series=article.series
            ) for article in models.Article.objects.all()
        ]


class WebPageStore(Store):
    @classmethod
    def get_all(cls):
        return [
            entities.WebPage(
                app=web_page.app,
                title=web_page.title,
                content=web_page.content
            ) for web_page in models.WebPage.objects.all()
        ]
