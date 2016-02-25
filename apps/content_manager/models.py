from django.db import models


class Category(models.Model):

    slug = models.CharField(max_length=128)
    name = models.CharField(max_length=128)

    def get_absolute_url(self):
        return "/articles/category/{slug}/".format(slug=self.slug)

    class Meta:
        app_label = "content_manager"


class Article(models.Model):

    slug = models.CharField(max_length=128, unique=True)
    title = models.CharField(max_length=128)
    date = models.DateTimeField()
    modified_date = models.DateTimeField(blank=True, null=True)
    categories = models.ManyToManyField(Category)
    content = models.TextField()
    summary = models.TextField(blank=True, null=True)
    raw_summary = models.TextField(blank=True, null=True)
    cover = models.CharField(max_length=128, blank=True, null=True)

    def get_absolute_url(self):
        return "/articles/{slug}/".format(slug=self.slug)

    class Meta:
        ordering = ['date']
        app_label = "content_manager"


class WebPage(models.Model):

    app = models.CharField(max_length=32)
    slug = models.CharField(max_length=128)
    title = models.CharField(max_length=128)
    content = models.TextField()

    def get_absolute_url(self):
        return "/{app}/{slug}/".format(app=self.app, slug=self.slug)

    class Meta:
        app_label = "content_manager"


class AppFile(models.Model):
    slug = models.CharField(max_length=128)
    file = models.FileField(upload_to="appfiles")

    class Meta:
        app_label = "content_manager"
