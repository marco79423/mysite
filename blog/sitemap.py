from django.contrib import sitemaps

from blog.models import Article, WebPage


class ArticleSitemap(sitemaps.Sitemap):

    changefreq = "weekly"
    priority = 0.5

    def items(self):
        return Article.objects.all()

    # def location(self, obj):
    #     return obj.get_absolute_url()


class WebPageSitemap(sitemaps.Sitemap):

    changefreq = "weekly"
    priority = 0.1

    def items(self):
        return WebPage.objects.all()

    # def location(self, obj):
    #     return obj.get_absolute_url()