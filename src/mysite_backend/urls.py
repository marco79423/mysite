from django.conf.urls import include
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from django.views.generic import TemplateView

from mysite_backend import settings
from mysite_backend import sitemaps
from api import urls as api_urls

sitemaps = {
    'article': sitemaps.ArticleSitemap,
    'web_page': sitemaps.WebPageSitemap,
}

urlpatterns = [
  url(r'^api/', include(api_urls)),

  url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt')),
  url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'views.get_article_list_page'
