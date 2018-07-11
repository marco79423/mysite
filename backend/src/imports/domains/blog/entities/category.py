from imports.domains import base_types


class Category(base_types.Entity):

    def __init__(self, slug: str, name: str):
        self.slug = slug
        self.name = name

    def serialize(self):
        return {
            'slug': self.slug,
            'name': self.name,
        }
