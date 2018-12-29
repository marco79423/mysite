import os

from imports.domains.rst_parser.adapters import PathAdapter


class PathAdapterImpl(PathAdapter):
    def exists(self, file_path: [str]) -> bool:
        return os.path.exists(file_path)
