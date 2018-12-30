import injector
import slugify

from imports.domains.blog.adapters import SlugAdapter


@injector.singleton
class SlugAdapterImpl(SlugAdapter):

    def to_slug(self, path: str) -> str:
        return slugify.slugify(path)
