from django.conf.urls import url
from django_downloadview import ObjectDownloadView

from blog import views
from content_manager.models import AppFile

urlpatterns = [
    url(r'^articles/$', views.get_article_list_page, name='article_list_page'),
    url(r'^articles/page/(?P<page_num>\d+)/$', views.get_article_list_page, name='article_list_page_with_page_num'),
    url(r'^articles/archives/$', views.get_archives_page, name='archives_page'),
    url(r'^articles/category/(?P<slug>[^/]+)/$', views.get_category_page, name='category_page'),
    url(r'^articles/category/(?P<slug>[^/]+)/page/(?P<page_num>\d+)/$',
        views.get_category_page, name='category_page_with_page_num'),
    url(r'^articles/(?P<slug>[^/]+)/$', views.get_article_page, name='article_page'),

    # download files
    url(r'^appfiles/(?P<slug>[^/]+)/$', ObjectDownloadView.as_view(model=AppFile)),

    # web page
    url(r'^(?P<app>[^/]+)/(?P<slug>[^/]+)/$', views.get_web_page, name='web_page_page'),
]
