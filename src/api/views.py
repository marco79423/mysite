from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from api import serializers
from content.models import Article
from content.models import WebPage


@api_view(['GET'])
def get_root(request):
    return Response({
        'articles': reverse('articles', request=request),
        'web_pages': reverse('web_pages', request=request),
    })


@api_view(['GET'])
def get_article_list(request):
    articles = Article.objects.all()
    serializer = serializers.ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_web_page_list(request):
    web_pages = WebPage.objects.all()
    serializer = serializers.WebPageSerializer(web_pages, many=True)
    return Response(serializer.data)
