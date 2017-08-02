from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse

from api import serializers
from content import content_manager
from content import store
from mysite_backend import settings


@api_view(['GET'])
def get_root(request):
    return Response({
        'articles': reverse('articles', request=request),
        'web_pages': reverse('web_pages', request=request),
    })


@api_view(['GET'])
def get_article_list(request):
    articles = store.ArticleStore.get_all()
    serializer = serializers.ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_web_page_list(request):
    web_pages = store.WebPageStore.get_all()
    serializer = serializers.WebPageSerializer(web_pages, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_info(request):
    return Response({
        'version': settings.VERSION,
    })


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def post_rebuild_task(request):
    source_dir = settings.SOURCE_DIR
    builder = content_manager.ContentManager()
    builder.build(source_dir)
    return Response({}, status=status.HTTP_201_CREATED)
