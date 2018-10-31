from unittest.mock import MagicMock

from imports.domains.base_types import Response
from imports.domains.blog.use_cases.query_articles_use_case import QueryArticlesUseCase


def test_query_articles():
    article1 = MagicMock()
    article1.serialize.return_value = 'article 1'

    article2 = MagicMock()
    article2.serialize.return_value = 'article 2'

    article_repo = MagicMock()
    article_repo.select_all.return_value = [article1, article2]

    uc = QueryArticlesUseCase(
        article_repo=article_repo
    )
    res = uc.execute()

    article_repo.select_all.assert_called_once()

    assert isinstance(res, Response)
    assert res.data == [
        'article 1',
        'article 2',
    ]
