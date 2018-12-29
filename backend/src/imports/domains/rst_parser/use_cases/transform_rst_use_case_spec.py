from unittest.mock import MagicMock

from imports.domains.base_types import Request, ResponseError, Response
from imports.domains.rst_parser.use_cases.transform_rst_use_case import TransformRstUseCase


def test_invalid_input():
    uc = TransformRstUseCase(
        path_adapter=MagicMock(),
        transform_rst_adapter=MagicMock(),
    )

    res = uc.execute()
    assert isinstance(res, ResponseError)
    assert res.reason == 'A request is required'

    uc = TransformRstUseCase(
        path_adapter=MagicMock(),
        transform_rst_adapter=MagicMock(),
    )
    res = uc.execute(Request())
    assert isinstance(res, ResponseError)
    assert res.reason == 'Invalid input'

    path_adapter = MagicMock()
    path_adapter.exists.return_value = False

    uc = TransformRstUseCase(
        path_adapter=path_adapter,
        transform_rst_adapter=MagicMock(),
    )
    res = uc.execute(Request('invalid_path'))

    assert isinstance(res, ResponseError)
    assert res.reason == 'article_path "invalid_path" does not exist'


def test_transform_rst():
    path_adapter = MagicMock()
    path_adapter.exists.return_value = True

    article = MagicMock()
    article.serialize.return_value = 'Article'

    transform_rst_adapter = MagicMock()
    transform_rst_adapter.generate_article.return_value = article

    uc = TransformRstUseCase(
        path_adapter=path_adapter,
        transform_rst_adapter=transform_rst_adapter,
    )
    res = uc.execute(Request('article_path'))

    assert isinstance(res, Response)
    assert res.data == 'Article'
