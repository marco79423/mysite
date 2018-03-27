from django.conf.urls import url

from blog import views

urlpatterns = [
    url(r'^$', views.get_root),
    url(r'^articles/$', views.get_article_list, name='articles'),
    url(r'^web_pages/$', views.get_web_page_list, name='web_pages'),
    url(r'^info/$', views.get_info, name='info'),
    url(r'^rebuild-tasks/$', views.post_rebuild_task, name='rebuild_task'),
    url(r'^rebuild-tasks/(?P<task_id>.*)/$', views.get_rebuild_task, name='rebuild_task'),
]
