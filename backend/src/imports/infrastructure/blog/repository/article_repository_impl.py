import injector

from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.category import Category
from imports.domains.blog.repositories import ArticleRepository
from imports.infrastructure.blog.model.article_model import ArticleModel
from imports.server import db


@injector.singleton
class ArticleRepositoryImpl(ArticleRepository):

    def select_all(self) -> [Article]:
        return [
            Article(
                slug=article_model.slug,
                title=article_model.title,
                date=article_model.date,
                categories=[
                    Category(
                        slug=category_model.slug,
                        name=category_model.name
                    ) for category_model in article_model.categories
                ],
                chicken_count=article_model.chicken_count,
                content=article_model.content,
                summary=article_model.summary,
                raw_summary=article_model.raw_summary,
                modified_date=article_model.modified_date,
            ) for article_model in db.session.query(ArticleModel)
        ]
