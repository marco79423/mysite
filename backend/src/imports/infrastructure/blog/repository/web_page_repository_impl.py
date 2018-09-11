import injector

from imports.domains.blog.entities.web_page import WebPage
from imports.domains.blog.repositories import WebPageRepository
from imports.infrastructure.blog.model.web_page_model import WebPageModel
from imports.server import db


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
