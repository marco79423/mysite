from domain.base_types import Service


class GetSourcePathService(Service):

    def get_all_article_paths(self, source_dir):
        base_dir = source_dir / "articles"
        article_paths = []
        for item_dir in base_dir.dirs():
            article_paths.append(self._get_file_path(item_dir))
        return article_paths

    def get_all_web_page_paths(self, source_dir):
        base_dir = source_dir / "web_pages"
        web_page_paths = []
        for item_dir in base_dir.dirs():
            web_page_paths.append(self._get_file_path(item_dir))
        return web_page_paths

    @staticmethod
    def _get_file_path(item_dir):
        for file_path in item_dir.files():
            if item_dir.abspath().name in file_path:
                return file_path
        raise FileNotFoundError
