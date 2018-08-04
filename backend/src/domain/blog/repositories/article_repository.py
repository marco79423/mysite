import injector

from blog import models
from domain.base_types import Repository
from domain.blog.models.article import Article, Type
from domain.blog.models.category import Category
from domain.blog.services.convert_to_slug_service import ConvertToSlugService
from domain.blog.services.truncate_html_word_service import TruncateHtmlWordsService


@injector.singleton
class ArticleRepository(Repository):

    @injector.inject
    def __init__(self,
                 convert_to_slug_serv: ConvertToSlugService,
                 truncate_html_words_serv: TruncateHtmlWordsService,
                 ):
        self.convert_to_slug_serv = convert_to_slug_serv
        self.truncate_html_words_serv = truncate_html_words_serv

    def get_by_type(self, type: Type) -> [Article]:
        if type == Type.NORMAL:
            return [
                Article(
                    type=Type.NORMAL,
                    slug=self.convert_to_slug_serv.to_slug(article.title),
                    title=article.title,
                    content=article.content,
                    categories=[
                        Category(
                            slug=self.convert_to_slug_serv.to_slug(category.name),
                            name=category.name,
                        ) for category in article.categories.all()
                    ],
                    summary=self.truncate_html_words_serv.truncate(article.content, 15),
                    date=article.date,
                    modified_date=article.modified_date,
                ) for article in models.Article.objects.all()
            ]
        elif type == Type.WEB_PAGE:
            return [
                Article(
                    type=Type.WEB_PAGE,
                    slug=self.convert_to_slug_serv.to_slug(web_page.title),
                    title=web_page.title,
                    content=web_page.content,
                ) for web_page in models.WebPage.objects.all()
            ]
        else:
            return []

    def add(self, article: Article) -> None:
        if article.type == Type.NORMAL:
            article_model = models.Article.objects.create(
                title=article.title,
                date=article.date,
                modified_date=article.modified_date,
                content=article.content,
            )
            for category in article.categories:
                category_model, _ = models.Category.objects.get_or_create(
                    name=category.name,
                )
                article_model.categories.add(category_model)
        elif article.type == Type.WEB_PAGE:
            models.WebPage.objects.create(
                app='me',
                title=article.title,
                content=article.content,
            )

    def clean(self) -> None:
        models.Article.objects.all().delete()
        models.Category.objects.all().delete()
        models.WebPage.objects.all().delete()
