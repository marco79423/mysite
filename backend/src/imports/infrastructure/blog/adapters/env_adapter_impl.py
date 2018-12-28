import os

from imports.domains.blog.adapters import EnvAdapter


class EnvAdapterImpl(EnvAdapter):

    def get(self, name: str, default=None):
        return os.environ.get(name, default)
