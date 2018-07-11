import injector
import slugify

from imports.domains.blog.services import SlugService


@injector.singleton
class SlugServiceImpl(SlugService):
    def to_slug(self, path: str) -> str:
        return slugify.slugify(path)
