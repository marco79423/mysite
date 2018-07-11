import os
from pathlib import Path

import injector

from imports.domains.blog.services import PathService


@injector.singleton
class PathServiceImpl(PathService):
    def exists(self, file_path: [str]) -> bool:
        return os.path.exists(file_path)

    def get_all_article_paths(self, source_dir: str) -> [str]:
        base_dir = Path(source_dir) / 'articles'
        article_paths = []
        for item_dir in self._fetch_dirs(base_dir):
            article_path = item_dir / str(item_dir.name + '.rst')
            if article_path.exists():
                article_paths.append(str(article_path))
        return article_paths

    def get_all_web_page_paths(self, source_dir: str) -> [str]:
        base_dir = Path(source_dir) / 'web_pages'
        web_page_paths = []
        for item_dir in self._fetch_dirs(base_dir):
            web_page_path = item_dir / str(item_dir.name + '.rst')
            if web_page_path.exists():
                web_page_paths.append(str(web_page_path))
        return web_page_paths

    @staticmethod
    def _fetch_dirs(file_path: Path):
        for item_dir in file_path.iterdir():
            if item_dir.is_dir():
                yield item_dir
