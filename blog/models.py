from django.db import models
from django.core.urlresolvers import reverse


class Category(models.Model):

    slug = models.CharField(max_length=128)
    name = models.CharField(max_length=128)

    def get_absolute_url(self):
        return "/articles/category/{slug}/".format(slug=self.slug)


class Article(models.Model):

    slug = models.CharField(max_length=128, unique=True)
    title = models.CharField(max_length=128)
    date = models.DateTimeField()
    modified_date = models.DateTimeField(blank=True, null=True)
    category = models.ForeignKey(Category)
    content = models.TextField()
    summary = models.TextField(blank=True, null=True)
    cover = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        ordering = ['date']

    def get_absolute_url(self):
        return "/articles/{slug}/".format(slug=self.slug)


class WebPage(models.Model):

    app = models.CharField(max_length=32)
    slug = models.CharField(max_length=128)
    title = models.CharField(max_length=128)
    content = models.TextField()

    def get_absolute_url(self):
        return "/{app}/{slug}/".format(app=self.app, slug=self.slug)


class CategoryMenu(models.Model):
    category = models.OneToOneField(Category, unique=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']


class WebPageMenu(models.Model):
    web_page = models.OneToOneField(WebPage, primary_key=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']


class AppFile(models.Model):
    slug = models.CharField(max_length=128)
    file = models.FileField(upload_to="appfiles")
