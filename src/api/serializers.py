from rest_framework import serializers


class CategorySerializer(serializers.Serializer):
    slug = serializers.URLField(read_only=True)
    name = serializers.CharField(read_only=True)


class ArticleSerializer(serializers.Serializer):
    slug = serializers.URLField(read_only=True)
    title = serializers.CharField(read_only=True)
    date = serializers.DateTimeField(read_only=True)
    modified_date = serializers.DateTimeField(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    content = serializers.CharField(read_only=True)
    summary = serializers.CharField(read_only=True)
    raw_summary = serializers.CharField(read_only=True)
    series = serializers.CharField(read_only=True)


class WebPageSerializer(serializers.Serializer):
    app = serializers.CharField(read_only=True)
    slug = serializers.URLField(read_only=True)
    title = serializers.CharField(read_only=True)
    content = serializers.CharField(read_only=True)
