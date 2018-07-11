import injector

from imports.domains.blog.entities.web_page import WebPage
from imports.domains.blog.repositories import WebPageRepository
from imports.infrastructure.blog.model import db
from imports.infrastructure.blog.model.web_page_model import WebPageModel


@injector.singleton
class WebPageRepositoryImpl(WebPageRepository):

    def select_all(self) -> [WebPage]:
        return [
            WebPage(
                app=web_page_model.app,
                slug=web_page_model.slug,
                title=web_page_model.title,
                content=web_page_model.content,
            ) for web_page_model in db.session.query(WebPageModel)
        ]

    def add(self, web_page: WebPage):
        db.session.add(WebPageModel(
            app=web_page.app,
            slug=web_page.slug,
            title=web_page.title,
            content=web_page.content,
        ))
        db.session.commit()

    def clear(self) -> None:
        db.session.query(WebPageModel).delete()
        db.session.commit()
