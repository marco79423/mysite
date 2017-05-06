from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=128, unique=True)
    date = models.DateTimeField()
    modified_date = models.DateTimeField(blank=True, null=True)
    categories = models.ManyToManyField(Category)
    content = models.TextField()
    series = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        ordering = ['-date']


class WebPage(models.Model):
    app = models.CharField(max_length=32)
    title = models.CharField(max_length=128)
    content = models.TextField()
