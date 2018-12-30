import injector
import os
from pathlib import Path


@injector.singleton
class PathHandler:

    @staticmethod
    def exists(file_path: str) -> bool:
        return Path(file_path).exists()

    @staticmethod
    def get_base_name(file_path: str) -> str:
        return Path(file_path).name

    @staticmethod
    def join(*file_paths: [str]) -> str:
        return os.path.join(*file_paths)

    @staticmethod
    def get_all_sub_folders(file_path: str) -> [str]:
        file_paths = []
        for sub_folder in Path(file_path).iterdir():
            if sub_folder.is_dir():
                file_paths.append(sub_folder)
        return file_paths
