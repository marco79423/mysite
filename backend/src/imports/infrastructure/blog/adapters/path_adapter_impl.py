import os
from pathlib import Path

from imports.domains.blog.adapters import PathAdapter


class PathAdapterImpl(PathAdapter):

    def exists(self, file_path: str) -> bool:
        return Path(file_path).exists()

    def get_base_name(self, file_path: str) -> str:
        return Path(file_path).name

    def join(self, *file_paths: [str]) -> str:
        return os.path.join(*file_paths)

    def get_all_sub_folders(self, file_path: str) -> [str]:
        file_paths = []
        for sub_folder in Path(file_path).iterdir():
            if sub_folder.is_dir():
                file_paths.append(sub_folder)
        return file_paths
