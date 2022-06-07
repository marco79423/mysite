import typing

import injector

from imports.domains.blog.entities.article import Article
from imports.domains.blog.entities.category import Category
from imports.domains.blog.repositories import ArticleRepository
from imports.infrastructure.domains.blog.model import db
from imports.infrastructure.domains.blog.model.article_model import ArticleModel, categories
from imports.infrastructure.domains.blog.model.category_model import CategoryModel


@injector.singleton
class ArticleRepositoryImpl(ArticleRepository):

    def select_by_slug(self, article_slug: str) -> typing.Union[Article, None]:
        article_model = db.session.query(ArticleModel).filter(ArticleModel.slug == article_slug).first()
        if not article_model:
            return None

        return Article(
            slug=article_model.slug,
            title=article_model.title,
            date=article_model.date,
            categories=[
                Category(
                    slug=category_model.slug,
                    name=category_model.name
                ) for category_model in article_model.categories
            ],
            cover=article_model.cover,
            chicken_count=article_model.chicken_count,
            content=article_model.content,
            summary=article_model.summary,
            raw_summary=article_model.raw_summary,
            modified_date=article_model.modified_date,
        )

    def select_all(self, order_by_date=True) -> [Article]:
        query = db.session.query(ArticleModel)
        if order_by_date:
            query = query.order_by(ArticleModel.date.desc())

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
                cover=article_model.cover,
                chicken_count=article_model.chicken_count,
                content=article_model.content,
                summary=article_model.summary,
                raw_summary=article_model.raw_summary,
                modified_date=article_model.modified_date,
            ) for article_model in query
        ]

    def add(self, article: Article):
        category_models = []
        for category in article.categories:
            category_model = db.session.query(CategoryModel).filter_by(name=category.name).first()
            if not category_model:
                category_model = CategoryModel(
                    slug=category.slug,
                    name=category.name,
                )
            category_models.append(category_model)

        db.session.add(ArticleModel(
            slug=article.slug,
            title=article.title,
            date=article.date,
            categories=[self._get_category_model(category) for category in article.categories],
            cover=article.cover,
            chicken_count=article.chicken_count,
            content=article.content,
            summary=article.summary,
            raw_summary=article.raw_summary,
            modified_date=article.modified_date,
        ))
        db.session.commit()

    def clear(self) -> None:
        db.session.query(ArticleModel).delete()
        db.session.query(CategoryModel).delete()
        db.session.execute(categories.delete())
        db.session.commit()

    @staticmethod
    def _get_category_model(category: Category) -> CategoryModel:
        category_model = db.session.query(CategoryModel).filter_by(name=category.name).first()
        if not category_model:
            category_model = CategoryModel(
                slug=category.slug,
                name=category.name,
            )
        return category_model
