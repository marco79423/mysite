from rest_framework.serializers import ModelSerializer

from app.models import Article


class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ('slug', 'title', 'date', 'modified_date', 'categories',
                  'content', 'summary', 'raw_summary', 'series',)