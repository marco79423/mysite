from rest_framework import serializers

from content import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('slug', 'name',)


class ArticleSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = models.Article
        fields = ('slug', 'title', 'date', 'modified_date', 'categories',
                  'content', 'summary', 'raw_summary', 'series',)


class WebPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WebPage
        fields = ('app', 'slug', 'title', 'content',)
