from django.conf.urls import include
from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.sitemaps.views import sitemap

from mysite.sitemaps import ArticleSitemap, WebPageSitemap

import api.urls

sitemaps = {
    'article': ArticleSitemap,
    'web_page': WebPageSitemap,
}

urlpatterns = [
    url(r'^api/', include(api.urls)),
    url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}),
]

handler404 = 'views.get_article_list_page'
