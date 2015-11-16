from django.conf.urls import include
from django.conf.urls import url
from django.views.generic import TemplateView

from mysite.sitemaps import ArticleSitemap, WebPageSitemap
import apps.blog.urls
import apps.old_site_support.urls

from apps.blog import views

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

    url(r'^', include(apps.blog.urls)),
    url(r'^', include(apps.old_site_support.urls)),
]

handler404 = 'blog.views.get_article_list_page'
