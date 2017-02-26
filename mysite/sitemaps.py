from django.contrib import sitemaps

from app.models import Article, WebPage


class ArticleSitemap(sitemaps.Sitemap):
    protocol = 'https'
    changefreq = "weekly"
    priority = 0.5

    def items(self):
        return Article.objects.all()


class WebPageSitemap(sitemaps.Sitemap):
    protocol = 'https'
    changefreq = "weekly"
    priority = 0.1

    def items(self):
        return WebPage.objects.all()
