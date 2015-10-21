from django.conf.urls import url
import old_site_support.views


urlpatterns = [
    url(r'^(?P<slug>[^\.]+)\.html$', old_site_support.views.get_old_slug_page, name='old_slug_page'),
]
