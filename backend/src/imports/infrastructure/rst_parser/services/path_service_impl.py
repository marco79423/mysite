import os

from imports.domains.rst_parser.services import PathService


class PathServiceImpl(PathService):
    def exists(self, file_path: [str]) -> bool:
        return os.path.exists(file_path)
