from django.conf.urls import include
from django.conf.urls import url
from django.views.generic import TemplateView

from mysite.sitemaps import ArticleSitemap, WebPageSitemap
import app.urls

from app import views

sitemaps = {
    'article': ArticleSitemap,
    'web_page': WebPageSitemap,
}

urlpatterns = [
    # index
    url(r'^$', views.get_article_list_page, name='article_list_page'),

    # special
    url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt')),
    url(r'^sitemap\.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': sitemaps}),

    url(r'^', include(app.urls)),
]

handler404 = 'views.get_article_list_page'
