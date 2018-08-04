from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from blog.domain_injector import domain_injector
from domain.base_types import Request
from domain.blog.use_cases.get_articles import GetArticlesUseCase
from mysite_backend import settings


@api_view(['GET'])
def get_root(request):
    return Response({
        'articles': reverse('articles', request=request),
        'web_pages': reverse('web_pages', request=request),
    })


@api_view(['GET'])
def get_article_list(request):
    uc = domain_injector.get(GetArticlesUseCase)
    res = uc.execute(Request({'type': 'normal'}))
    return Response(res.data)


@api_view(['GET'])
def get_web_page_list(request):
    uc = domain_injector.get(GetArticlesUseCase)
    res = uc.execute(Request({'type': 'web_page'}))
    return Response(res.data)


@api_view(['GET'])
def get_info(request):
    return Response({
        'version': settings.VERSION,
    })
