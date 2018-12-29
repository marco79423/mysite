import injector

from imports.domains.rst_parser.adapters import PathAdapter
from imports.infrastructure.base.path_handler import PathHandler


@injector.singleton
class PathAdapterImpl(PathAdapter):

    @injector.inject
    def __init__(self, path_handler: PathHandler):
        self.path_handler = path_handler

    def exists(self, file_path: str) -> bool:
        return self.path_handler.exists(file_path)
