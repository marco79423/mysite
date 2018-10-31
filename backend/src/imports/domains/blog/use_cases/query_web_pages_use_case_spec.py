from unittest.mock import MagicMock

from imports.domains.base_types import Response
from imports.domains.blog.use_cases.query_web_pages_use_case import QueryWebPagesUseCase


def test_query_web_pages():
    web_page1 = MagicMock()
    web_page1.serialize.return_value = 'web page 1'

    web_page2 = MagicMock()
    web_page2.serialize.return_value = 'web page 2'

    web_page_repo = MagicMock()
    web_page_repo.select_all.return_value = [web_page1, web_page2]

    uc = QueryWebPagesUseCase(
        web_page_repo=web_page_repo
    )
    res = uc.execute()

    web_page_repo.select_all.assert_called_once()

    assert isinstance(res, Response)
    assert res.data == [
        'web page 1',
        'web page 2',
    ]
