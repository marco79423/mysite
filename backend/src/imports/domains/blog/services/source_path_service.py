import injector

from imports.domains.base_types import Service
from imports.domains.blog.adapters import PathAdapter


@injector.singleton
class SourcePathService(Service):

    @injector.inject
    def __init__(self, path_adapter: PathAdapter):
        self.path_adapter = path_adapter

    def get_all_article_paths(self, source_dir: str) -> [str]:
        base_dir = self.path_adapter.join(source_dir, 'articles')
        return self._get_all_rst_paths(base_dir)

    def get_all_web_page_paths(self, source_dir: str) -> [str]:
        base_dir = self.path_adapter.join(source_dir, 'web_pages')
        return self._get_all_rst_paths(base_dir)

    def _get_all_rst_paths(self, base_path: str):
        rst_paths = []
        for folder_path in self.path_adapter.get_all_sub_folders(base_path):
            rst_path = self._guess_target_rst_path_by_folder_path(folder_path)
            if self.path_adapter.exists(rst_path):
                rst_paths.append(rst_path)
        return rst_paths

    def _guess_target_rst_path_by_folder_path(self, folder_path: str):
        base_name = self.path_adapter.get_base_name(folder_path)
        return self.path_adapter.join(folder_path, base_name + '.rst')
