import os

import injector

from imports.domains.blog.services import EnvService


@injector.singleton
class EnvServiceImpl(EnvService):

    def get(self, name: str, default=None):
        return os.environ.get(name, default)
