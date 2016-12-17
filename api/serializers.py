from rest_framework import serializers
from app.models import Category
from app.models import Article
from app.models import WebPage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('slug', 'name',)


class ArticleSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ('slug', 'title', 'date', 'modified_date', 'categories',
                  'content', 'summary', 'raw_summary', 'series',)


class WebPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebPage
        fields = ('app', 'slug', 'title', 'content', )
