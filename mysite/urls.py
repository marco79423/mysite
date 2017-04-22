from django.conf.urls import include
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from django.views.generic import TemplateView
from django_downloadview import ObjectDownloadView

from api import urls as api_urls
from content import models
from mysite import settings
from mysite import sitemaps

sitemaps = {
    'article': sitemaps.ArticleSitemap,
    'web_page': sitemaps.WebPageSitemap,
}

urlpatterns = [
  url(r'^api/', include(api_urls)),
  url(r'^files/(?P<slug>.+)/$', ObjectDownloadView.as_view(model=models.AppFile)),

  url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt')),
  url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'views.get_article_list_page'
