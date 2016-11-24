from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import ArticleSerializer
from app.models import Article


@api_view(['GET'])
def get_article_list(request):
    article = Article.objects.all()
    serializer = ArticleSerializer(article, many=True)
    return Response(serializer.data)
