import injector
import uuid

from imports.domains.blog.adapters import IdentityAdapter


@injector.singleton
class IdentityAdapterImpl(IdentityAdapter):

    def generate(self) -> str:
        return str(uuid.uuid1())
