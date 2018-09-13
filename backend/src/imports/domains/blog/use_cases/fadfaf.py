from imports.domains.base_types import ResponseError, Request, Response
from imports.domains.blog.use_cases.query_article_use_case import QueryArticlesUseCase


def test_invalid_input():
    uc = QueryArticlesUseCase()
    res = uc.execute()
    assert isinstance(res, ResponseError)
    assert res.reason == 'a request is required'

    uc = QueryArticlesUseCase()
    res = uc.execute(Request())
    assert isinstance(res, ResponseError)
    assert res.reason == 'invalid input'

    uc = QueryArticlesUseCase()
    res = uc.execute(Request(123))
    assert isinstance(res, ResponseError)
    assert res.reason == 'invalid input'

    uc = QueryArticlesUseCase()
    res = uc.execute(Request({'type': 'invalid type'}))
    assert isinstance(res, ResponseError)
    assert res.reason == 'invalid article type'


def test_query_normal_articles():
    uc = QueryArticlesUseCase()
    res = uc.execute(Request({'type': 'normal'}))
    assert isinstance(res, Response)
    assert res.data == 'articles'


def test_query_web_pages():
    uc = QueryArticlesUseCase()
    res = uc.execute(Request({'type': 'web_page'}))
    assert isinstance(res, Response)
    assert res.data == 'web_pages'
