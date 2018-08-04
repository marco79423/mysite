import slugify

from domain.base_types import Service


class ConvertToSlugService(Service):
    def to_slug(self, string: str) -> str:
        return slugify.slugify(string)
