import injector
import os

from imports.domains.blog.adapters import EnvAdapter


@injector.singleton
class EnvAdapterImpl(EnvAdapter):

    def get(self, name: str, default=None):
        return os.environ.get(name, default)
