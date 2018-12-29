import injector
import os
from pathlib import Path

from imports.domains.blog.adapters import PathAdapter
from imports.infrastructure.base.path_handler import PathHandler


@injector.singleton
class PathAdapterImpl(PathAdapter):

    @injector.inject
    def __init__(self, path_handler: PathHandler):
        self.path_handler = path_handler

    def exists(self, file_path: str) -> bool:
        return self.path_handler.exists(file_path)

    def get_base_name(self, file_path: str) -> str:
        return self.path_handler.get_base_name(file_path)

    def join(self, *file_paths: [str]) -> str:
        return self.path_handler.join(*file_paths)

    def get_all_sub_folders(self, file_path: str) -> [str]:
        return self.path_handler.get_all_sub_folders(file_path)
