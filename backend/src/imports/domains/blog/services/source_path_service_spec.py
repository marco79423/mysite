from unittest.mock import MagicMock

from imports.domains.blog.services.source_path_service import SourcePathService


def test_get_all_article_paths():
    path_adapter = MagicMock()
    path_adapter.exists.return_value = True
    path_adapter.get_all_sub_folders.return_value = ['a', 'b']
    path_adapter.join.side_effect = [
        'source_dir/articles',
        'source_dir/articles/a',
        'source_dir/articles/b',
    ]

    source_path_serv = SourcePathService(path_adapter)
    article_paths = source_path_serv.get_all_article_paths(source_dir='source_dir')

    assert article_paths == [
        'source_dir/articles/a',
        'source_dir/articles/b',
    ]
