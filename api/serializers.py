from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from app.models import Article


class ArticleSerializer(ModelSerializer):
    categories = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ('slug', 'title', 'date', 'modified_date', 'categories',
                  'content', 'summary', 'raw_summary', 'series',)