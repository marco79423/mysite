from django.conf.urls import include
from django.conf.urls import url
from django.conf.urls.static import static

from blog import urls as api_urls
from mysite_backend import settings

urlpatterns = [
    url(r'^api/', include(api_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'views.get_article_list_page'
