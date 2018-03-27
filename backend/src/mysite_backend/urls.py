from django.conf.urls import include
from django.conf.urls import url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.authtoken import views as authtoken_views

from blog import urls as api_urls
from mysite_backend import settings

urlpatterns = [
    url(r'^api/', include(api_urls)),
    url(r'^auth/login/$', authtoken_views.obtain_auth_token),

    url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'views.get_article_list_page'
