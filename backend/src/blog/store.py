from blog import entities
from blog import models


class Store:
    pass


class ArticleStore(Store):
    @classmethod
    def clean(cls):
        models.Article.objects.all().delete()
        models.Category.objects.all().delete()

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

    @classmethod
    def create(cls, article):
        article_model = models.Article.objects.create(
            title=article.title,
            date=article.date,
            modified_date=article.modified_date,
            content=article.content,
            series=article.series
        )
        for category in article.categories:
            category_model, _ = models.Category.objects.get_or_create(
                name=category.name,
            )
            article_model.categories.add(category_model)


class WebPageStore(Store):
    @classmethod
    def clean(cls):
        models.WebPage.objects.all().delete()

    @classmethod
    def get_all(cls):
        return [
            entities.WebPage(
                app=web_page.app,
                title=web_page.title,
                content=web_page.content
            ) for web_page in models.WebPage.objects.all()
        ]

    @classmethod
    def create(cls, web_page):
        models.WebPage.objects.create(
            app=web_page.app,
            title=web_page.title,
            content=web_page.content,
        )
