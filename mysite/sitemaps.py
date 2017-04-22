from django.contrib import sitemaps

from app import models


class ArticleSitemap(sitemaps.Sitemap):
    protocol = 'https'
    changefreq = "weekly"
    priority = 0.5

    def items(self):
        return models.Article.objects.all()


class WebPageSitemap(sitemaps.Sitemap):
    protocol = 'https'
    changefreq = "weekly"
    priority = 0.1

    def items(self):
        return models.WebPage.objects.all()
